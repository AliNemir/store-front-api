import supertest from 'supertest'
import route from '../../index'
import { User, user } from '../../models/users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret: string = process.env.token as unknown as string

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const user_ = new User()
const api = supertest(route)
let token: string

describe('users handlars api test', () => {
    it('users index route', async () => {
        const u: user = {
            id: 1,
            first_name: 'Ali',
            last_name: 'Nemir',
            password: 'password123'
        }
        token = jwt.sign({ user: u }, secret)
        const res = await api.get('/users').set({ token: token })
        expect(res.status).toBe(200)
    })

    it('users show route', async () => {
        const res = await api.get('/users/1').set({ token: token })
        expect(res.status).toBe(200)
    })

    it('users create route', async () => {
        const d = {
            first_name: 'Ali',
            last_name: 'Nemir',
            password: 'password123'
        }
        const res = await api.post('/users').send(d)
        token = jwt.sign({ user: res }, secret)
        expect(res.status).toBe(200)
    })

    it('users update route', async () => {
        const d = {
            first_name: 'Ali',
            last_name: 'Essam'
        }
        const res = await api.patch('/users/1').send(d).set({ token: token })
        expect(res.status).toBe(200)
    })

    it('users login route', async () => {
        const d = {
            token: token
        }

        const res = await api.post('/login').set(d)
        expect(res.status).toBe(200)
    })

    it('users get token route', async () => {
        const res = await api.get('/users/2/get_token').set({ token: token })
        expect(res.status).toBe(200)
    })

    it('users delete route', async () => {
        const res = await api.delete('/users/2').set({ token: token })
        expect(res.status).toBe(200)
    })
})
