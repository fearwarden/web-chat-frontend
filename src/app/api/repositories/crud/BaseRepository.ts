import {HttpClient} from "@/app/api/http/HttpClient.ts";

export interface IBaseRepository<T> {}

export abstract class BaseRepository<T> extends HttpClient implements IBaseRepository<T> {}