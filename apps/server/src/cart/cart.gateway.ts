import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({
    path: '/api/cartSocket',
    cors: {
        origin: true,
        credentials: true
    }
})
export class CartGateway {

    @SubscribeMessage('cart:join')
    handleJoinCart(
        @MessageBody() body: string) {
        console.log(body);
    }
}