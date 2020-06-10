/* eslint-disable no-unused-vars */
import * as Koa from 'koa';
import KoaRouter from 'koa-router';

export type Router = KoaRouter
export type Context = Koa.Context
export type Next = Koa.Next
export type Middleware = Koa.Middleware
export type RouterMiddleware = (...args: any[]) => Promise<any>;
