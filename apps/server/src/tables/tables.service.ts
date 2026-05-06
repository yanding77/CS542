import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../database/entities/table.entity';

@Injectable()
export class TablesService {
    constructor(
        @InjectRepository(Table)
        private tableRepo: Repository<Table>,
    ) {}

    // GET all tables for a location
    async getTablesByLocation(locationId: string) {
        return this.tableRepo.find({
            where: {
                location: { id: locationId },
            },
            order: {
                created_at: 'DESC',
            },
        });
    }

    // GET single table
    async getTableById(id: string) {
        return this.tableRepo.findOne({
            where: { id },
        });
    }

    // CREATE table
    async createTable(data: {
        tableid: string;
        locationId: string;
        qrCodeData?: string;
    }) {

        console.log('CREATE TABLE DATA:', data);
        if (!data.tableid || !data.locationId) {
            throw new Error('Missing required fields');
        }

        const qrCodeData =
            data.qrCodeData && data.qrCodeData.trim() !== ''
                ? data.qrCodeData
                : `http://localhost:5170/${data.locationId}/${data.tableid}`;

        const table = this.tableRepo.create({
            tableid: data.tableid,
            location: { id: data.locationId },
            qrCodeData,
        });

        await this.tableRepo.save(table);

        return {
            message: 'Table created successfully',
            table,
        };
    }

    // UPDATE table
    async updateTable(
        tableId: string,
        updateData: {
            tableid?: string;
            qrCodeData?: string;
        },
    ) {
        const table = await this.tableRepo.findOne({
            where: { id: tableId },
        });

        if (!table) {
            throw new Error('Table not found');
        }

        if (updateData.tableid !== undefined) {
            table.tableid = updateData.tableid;
        }

        if (updateData.qrCodeData !== undefined) {
            table.qrCodeData = updateData.qrCodeData;
        }

        return await this.tableRepo.save(table);
    }

    // DELETE table
    async deleteTable(id: string) {
        const table = await this.tableRepo.findOne({
            where: { id },
        });

        if (!table) {
            throw new Error('Table not found');
        }

        await this.tableRepo.delete(id);

        return {
            success: true,
            message: `Table ${id} deleted successfully`,
        };
    }
}