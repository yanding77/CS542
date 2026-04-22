import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ItemDTO } from '../types/types';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCart', () => {
    it('should return a cart from the service', () => {
      const cart = controller.getCart('table-1');
      expect(cart.tableId).toBe('table-1');
    });
  });

  describe('addItem', () => {
    it('should call addItem on the service and return cart', () => {
      const dto: ItemDTO = { productId: 'ent-1', clientId: 'client-1' };
      const cart = controller.addItem('table-1', dto);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].id).toBe('ent-1');
    });
  });

  describe('removeItem', () => {
    it('should call removeItem on the service and return cart', () => {
      const dto: ItemDTO = { productId: 'ent-1', clientId: 'client-1' };
      controller.addItem('table-1', dto); // setup
      const cart = controller.removeItem('table-1', dto);
      expect(cart.items.length).toBe(0);
    });
  });
});
