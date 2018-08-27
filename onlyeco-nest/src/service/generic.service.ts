import {Repository} from 'typeorm';

export abstract class GenericService<ENTITY> implements IService<ENTITY> {
    constructor() {
        this.initializeRepository();
    }
    
    protected repository: Repository<ENTITY>;
    
    public abstract initializeRepository();
    
    async findAll(): Promise<ENTITY[]> {
        return await this.repository.find();
    }
    
    async findById(id: any): Promise<ENTITY> {
        return await this.repository.findOneById(id);
    }
    
    async findByIds(ids: any[]): Promise<ENTITY[]> {
        return await this.repository.findByIds(ids);
    }
    
    async destroy(object: ENTITY): Promise<ENTITY> {
        return await this.repository.remove(object);
    }
    
    async destroyMultiple(object: ENTITY[]): Promise<ENTITY[]> {
        return await this.repository.remove(object);
    }
    
    async insert(object: ENTITY): Promise<void> {
        return await this.repository.insert(object);
    }
    
    async update(object: ENTITY): Promise<ENTITY> {
        return await this.repository.save(<any>object);
    }
    
    async count(): Promise<number> {
        return await this.repository.count();
    }
}