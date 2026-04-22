import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ItemDTO } from '../types/types';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCart', () => {
    it('should return a new empty cart for a new tableId', () => {
      const cart = service.getCart('table-1');
      expect(cart).toBeDefined();
      expect(cart.tableId).toBe('table-1');
      expect(cart.items.length).toBe(0);
      expect(cart.totalPrice).toBe(0);
      expect(cart.itemCount).toBe(0);
    });
  });

  describe('addItem', () => {
    it('should add a valid item to the cart', () => {
      const dto: ItemDTO = { productId: 'ent-1', clientId: 'client-1' };
      const cart = service.addItem('table-1', dto);
      
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].id).toBe('ent-1');
      expect(cart.items[0].quantity).toBe(1);
      expect(cart.itemCount).toBe(1);
      expect(cart.totalPrice).toBeGreaterThan(0);
    });

    it('should increment quantity if item already exists', () => {
      const dto: ItemDTO = { productId: 'ent-1', clientId: 'client-1' };
      service.addItem('table-1', dto);
      const cart = service.addItem('table-1', dto);
      
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.itemCount).toBe(2);
    });

    it('should throw NotFoundException if product is not in menu', () => {
      const dto: ItemDTO = { productId: 'invalid-id', clientId: 'client-1' };
      expect(() => service.addItem('table-1', dto)).toThrow(NotFoundException);
    });
  });

  describe('removeItem', () => {
    it('should decrement quantity if greater than 1', () => {
      const dto: ItemDTO = { productId: 'ent-1', clientId: 'client-1' };
      service.addItem('table-1', dto);
      service.addItem('table-1', dto);
      const cart = service.removeItem('table-1', dto);
      
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(1);
      expect(cart.itemCount).toBe(1);
    });

    it('should remove item entirely if quantity is 1', () => {
      const dto: ItemDTO = { productId: 'ent-1', clientId: 'client-1' };
      service.addItem('table-1', dto);
      const cart = service.removeItem('table-1', dto);
      
      expect(cart.items.length).toBe(0);
      expect(cart.itemCount).toBe(0);
      expect(cart.totalPrice).toBe(0);
    });

    it('should throw NotFoundException if product is not in menu', () => {
      const dto: ItemDTO = { productId: 'invalid-id', clientId: 'client-1' };
      expect(() => service.removeItem('table-1', dto)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product is not in cart', () => {
      const dto: ItemDTO = { productId: 'ent-1', clientId: 'client-1' };
      expect(() => service.removeItem('table-1', dto)).toThrow(NotFoundException);
    });
  });
});
