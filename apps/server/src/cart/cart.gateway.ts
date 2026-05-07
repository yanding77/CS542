import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io"
import { CartService } from "./cart.service";

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
}