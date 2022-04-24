/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Addes new message to database.
     * @returns any new user added successfully
     * @throws ApiError
     */
    public static postApiMessage({
        body,
    }: {
        body: {
            force: boolean;
            text: string;
            user_id: number;
        },
    }): CancelablePromise<{
        message: string;
        success: boolean;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/message',
            body: body,
            errors: {
                422: `missing body`,
            },
        });
    }

    /**
     * Returns all messages.
     * @returns any List of all messages
     * @throws ApiError
     */
    public static getApiMessageAll(): CancelablePromise<Array<{
        content: string;
        hate: boolean;
        name: string;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/message/all',
        });
    }

    /**
     * Addes new user to database.
     * @returns any new user added successfully
     * @throws ApiError
     */
    public static postApiUser({
        body,
    }: {
        body: any,
    }): CancelablePromise<{
        id: number;
        username: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user',
            body: body,
            errors: {
                400: `user already exists`,
                422: `missing body`,
            },
        });
    }

    /**
     * Returns user from database.
     * Not cleaning input param. Pls no hack me.<br/>
     * @returns any user
     * @throws ApiError
     */
    public static getApiUser({
        name,
    }: {
        name: string,
    }): CancelablePromise<{
        id: number;
        username: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/{name}',
            path: {
                'name': name,
            },
            errors: {
                404: `No user with given username found`,
            },
        });
    }

}