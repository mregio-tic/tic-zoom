import { Column, Table, Model } from "sequelize-typescript"

@Table
export class User extends Model{
    @Column username!: string
    @Column group!: string
    @Column audio!: boolean
    @Column talking!: boolean
}