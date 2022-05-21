import { Order, order } from '../../models/orders'

const order_ = new Order()

// eslint-disable-next-line @typescript-eslint/no-unused-vars

describe('Tests for Orders model', () => {
    //index function
    it('test index to be define', () => {
        expect(order_.index).toBeDefined()
    })
    it('test index to equal', async () => {
        const res = await order_.index(1)
        expect(res.length).toEqual(2)
    })
    //create function
    it('test create be define', () => {
        expect(order_.create).toBeDefined()
    })
    it('test to create to equal', async () => {
        const o_: order = {
            id: 3,
            status: 'open',
            user_id: 1
        }
        const res = await order_.create(o_)
        expect(res).toEqual('created')
    })
    //show function
    it('test show be define', () => {
        expect(order_.show).toBeDefined()
    })
    it('test to show to equal', async () => {
        const res = await order_.show(1, 1)
        expect(res.id).toEqual(1)
    })
    //update function
    it('test update be define', () => {
        expect(order_.update).toBeDefined()
    })
    it('test to update to equal', async () => {
        const o_: order = {
            id: 2,
            status: 'complete',
            user_id: 1
        }
        const res = await order_.update(o_)
        expect(res).toEqual('updated')
    })
    //delete function
    it('test delete be define', () => {
        expect(order_.delete).toBeDefined()
    })
    it('test delete to equal', async () => {
        const res = await order_.delete(2, 1)
        expect(res).toEqual('deleted')
    })
    //add product
    it('test add product be define', () => {
        expect(order_.addProduct).toBeDefined()
    })
    it('test add product to equal', async () => {
        const res = await order_.addProduct(1, 1, 5)
        expect(res).toEqual('added')
    })
})
