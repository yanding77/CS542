import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { CartService } from "./cart.service";
import { ItemDTO, TableCart } from "src/types/types";

@WebSocketGateway({
    path: '/api/cartSocket',
    cors: {
        origin: true,
        credentials: true
    }
})
export class CartGateway {
    @WebSocketServer()
    server: Server;
    constructor(private readonly cartService: CartService) { }

    @SubscribeMessage('cart:join')
    async handleJoinCart(
        @MessageBody() data: { tableId: string },
        @ConnectedSocket() client: Socket) {
        const room = `cart:${data.tableId}`
        client.join(room);

        const cart = await this.cartService.getCart(data.tableId);

        client.emit('cart:updated', cart);
    }

    @SubscribeMessage('cart:addItem')
    async handleAddItem(
        @MessageBody() data: { tableId: string, dto: ItemDTO },
        @ConnectedSocket() client: Socket
    ) {
        try {
            const cart = await this.cartService.addItem(data.tableId, data.dto);
            this.server.to(`cart:${data.tableId}`).emit('cart:updated', cart)
        }
        catch (err) {
            client.emit('cart:error', { message: err.message });
        }
    }

    @SubscribeMessage('cart:deleteItem')
    async handleDeleteItem(
        @MessageBody() data: { tableId: string, dto: ItemDTO },
        @ConnectedSocket() client: Socket) {
        try {
            const cart = await this.cartService.removeItem(data.tableId, data.dto);
            this.server.to(`cart:${data.tableId}`).emit('cart:updated', cart)
        }
        catch (err) {
            client.emit('cart:error', { message: err.message })
        }
    }

    broadcastCart(tableId: string, cart: TableCart) { }
}