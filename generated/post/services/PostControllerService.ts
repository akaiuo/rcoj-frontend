/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_CommentVO_ } from '../models/BaseResponse_Page_CommentVO_';
import type { BaseResponse_Page_PostGetVO_ } from '../models/BaseResponse_Page_PostGetVO_';
import type { BaseResponse_PostGetVO_ } from '../models/BaseResponse_PostGetVO_';
import type { PostAddRequest } from '../models/PostAddRequest';
import type { PostCommentAddRequest } from '../models/PostCommentAddRequest';
import type { PostCommentQueryRequest } from '../models/PostCommentQueryRequest';
import type { PostQueryRequest } from '../models/PostQueryRequest';
import type { SolutionPageQueryRequest } from '../models/SolutionPageQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostControllerService {
    /**
     * addPost
     * @param postAddRequest postAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addPostUsingPost(
        postAddRequest: PostAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post/add',
            body: postAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * cancelFavourPost
     * @param postId postId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelFavourPostUsingPut(
        postId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/post/cancel/favour',
            query: {
                'postId': postId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * cancelStarPost
     * @param postId postId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelStarPostUsingPut(
        postId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/post/cancel/star',
            query: {
                'postId': postId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addComment
     * @param postCommentAddRequest postCommentAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCommentUsingPost(
        postCommentAddRequest: PostCommentAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post/comment/add',
            body: postCommentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * cancelThumbComment
     * @param commentId commentId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelThumbCommentUsingPut(
        commentId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/post/comment/cancel/thumb',
            query: {
                'commentId': commentId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteComment
     * @param commentId commentId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static deleteCommentUsingDelete(
        commentId?: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/post/comment/delete',
            query: {
                'commentId': commentId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * postCommentsByPostId
     * @param postCommentQueryRequest postCommentQueryRequest
     * @returns BaseResponse_Page_CommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static postCommentsByPostIdUsingPost(
        postCommentQueryRequest: PostCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post/comment/list/page/vo',
            body: postCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * thumbComment
     * @param commentId commentId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static thumbCommentUsingPut(
        commentId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/post/comment/thumb',
            query: {
                'commentId': commentId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * delPost
     * @param id id
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static delPostUsingDelete(
        id: number,
    ): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/post/del',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * favourPost
     * @param postId postId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static favourPostUsingPut(
        postId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/post/favour',
            query: {
                'postId': postId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getPost
     * @param id id
     * @returns BaseResponse_PostGetVO_ OK
     * @throws ApiError
     */
    public static getPostUsingGet(
        id: number,
    ): CancelablePromise<BaseResponse_PostGetVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getPostList
     * @param postQueryRequest postQueryRequest
     * @returns BaseResponse_Page_PostGetVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getPostListUsingPost(
        postQueryRequest: PostQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostGetVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post/list/page/vo',
            body: postQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getSolutionList
     * @param solutionPageQueryRequest solutionPageQueryRequest
     * @returns BaseResponse_Page_PostGetVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getSolutionListUsingPost(
        solutionPageQueryRequest: SolutionPageQueryRequest,
    ): CancelablePromise<BaseResponse_Page_PostGetVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post/solution/list/page/vo',
            body: solutionPageQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * starPost
     * @param postId postId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static starPostUsingPut(
        postId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/post/star',
            query: {
                'postId': postId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
