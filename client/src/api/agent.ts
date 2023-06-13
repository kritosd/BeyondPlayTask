import axios, { AxiosResponse } from 'axios';
import {IDeveloperSendDescriptor, IDeveloper, IRoles, IStatus, ITeams, IRandomize, IRandomizeResp} from '../types';

const MS: number = 500;

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.response.use(
    response => response,
    error => {
        alert(error.message);
    }
)

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(MS)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(MS)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(MS)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(MS)).then(responseBody)
};

export const Developers = {
    list: (): Promise<IDeveloper[]> => requests.get('/developers'),
    details: (id: string): Promise<IDeveloper> => requests.get(`/developers/${id}`),
    create: (developer: IDeveloperSendDescriptor): Promise<IDeveloper> => requests.post(`/developers`, developer),
    update: (id: string, developer: IDeveloperSendDescriptor) => requests.put(`/developers/${id}`, developer),
    delete: (id: string) => requests.delete(`/developers/${id}`),
};

export const Roles = {
    list: (): Promise<IRoles[]> => requests.get('/roles')
};

export const Statuses = {
    list: (): Promise<IStatus[]> => requests.get('/statuses')
};

export const Teams = {
    list: (): Promise<ITeams[]> => requests.get('/teams')
};

export const Randomize = {
    calculate: (randomize: IRandomize): Promise<IRandomizeResp> => requests.post('/randomize', randomize)
};