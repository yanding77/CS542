import { Injectable } from '@nestjs/common';
import {AddItemDto, DeleteItemDto} from "../types";

@Injectable()
export class CartService {
    private tables = new Map<string, any>();
}
