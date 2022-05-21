import { User, user } from '../../models/users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secret: string = process.env.token as unknown as string

const user_ = new User()
let token: string

describe('Tests for User model', () => {
    //index function
    it('test index to be define', () => {
        expect(user_.index).toBeDefined()
    })
    it('test index to equal', async () => {
        const res = await user_.index()
        expect(res.length).toEqual(1)
    })
    //create function
    it('test create to be define', () => {
        expect(user_.create).toBeDefined()
    })
    it('test create to equal', async () => {
        const u: user = {
            id: 3,
            first_name: '21',
            last_name: '50',
            password: 'marwan'
        }
        const res = await user_.create(u)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        token = jwt.sign({ user: res }, secret)
        expect(res.first_name).toEqual('21')
    })
    //show function
    it('test show to be define', () => {
        expect(user_.show).toBeDefined()
    })
    it('test show to equal', async () => {
        const res = await user_.show(1)
        expect(res.id).toEqual(1)
    })
    //update function
    it('test update to define', () => {
        expect(user_.update).toBeDefined()
    })
    it('test update to equal', async () => {
        const u: user = {
            id: 1,
            first_name: 'Ali',
            last_name: 'Nemir',
            password: 'password123'
        }
        const res = await user_.update(u)
        expect(res.first_name).toEqual('Ali')
    })
    //auth function
    it('test auth to define', () => {
        expect(user_.auth).toBeDefined()
    })
    it('test auth to equal', async () => {
        const u: user = {
            id: 3,
            first_name: 'noone',
            last_name: 'nowhere',
            password: 'nothing'
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res1 = await user_.create(u)
        const res = await user_.auth('noone', 'nothing')
        expect(res).toEqual('succeed')
    })

    //delete function
    it('test delete to be define', () => {
        expect(user_.delete).toBeDefined()
    })

    it('test delete to equal', async () => {
        const res = await user_.delete(2)
        expect(res).toEqual('deleted')
    })
})
