/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

const FormData = require("form-data");

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '/api/v1';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AdminService {
  /**
   * List cron tasks
   */
  adminCronList(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/cron';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Run cron task
   */
  adminCronRun(
    params: {
      /** task to run */
      task: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/cron/{task}';
      url = url.replace('{task}', params['task'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List all organizations
   */
  adminGetAllOrgs(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/orgs';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List unadopted repositories
   */
  adminUnadoptedList(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
      /** pattern of repositories to search for */
      pattern?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/unadopted';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'], pattern: params['pattern'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Adopt unadopted files as a repository
   */
  adminAdoptRepository(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/unadopted/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete unadopted files
   */
  adminDeleteUnadoptedRepository(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/unadopted/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List all users
   */
  adminGetAllUsers(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a user
   */
  adminCreateUser(
    params: {
      /**  */
      body?: CreateUserOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a user
   */
  adminDeleteUser(
    params: {
      /** username of user to delete */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users/{username}';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit an existing user
   */
  adminEditUser(
    params: {
      /** username of user to edit */
      username: string;
      /**  */
      body?: EditUserOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users/{username}';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a public key on behalf of a user
   */
  adminCreatePublicKey(
    params: {
      /** username of the user */
      username: string;
      /**  */
      key?: CreateKeyOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users/{username}/keys';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['key'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a user's public key
   */
  adminDeleteUserPublicKey(
    params: {
      /** username of user */
      username: string;
      /** id of the key to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users/{username}/keys/{id}';
      url = url.replace('{username}', params['username'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create an organization
   */
  adminCreateOrg(
    params: {
      /** username of the user that will own the created organization */
      username: string;
      /**  */
      organization: CreateOrgOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users/{username}/orgs';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['organization'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a repository on behalf of a user
   */
  adminCreateRepo(
    params: {
      /** username of the user. This user will own the created repository */
      username: string;
      /**  */
      repository: CreateRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/users/{username}/repos';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['repository'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class MiscellaneousService {
  /**
   * Render a markdown document as HTML
   */
  renderMarkdown(
    params: {
      /**  */
      body?: MarkdownOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/markdown';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Render raw markdown as HTML
   */
  renderMarkdownRaw(
    params: {
      /** Request body to render */
      body: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/markdown/raw';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Returns the nodeinfo of the Gitea application
   */
  getNodeInfo(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/nodeinfo';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get default signing-key.gpg
   */
  getSigningKey(options: IRequestOptions = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/signing-key.gpg';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Returns the version of the Gitea application
   */
  getVersion(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/version';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class NotificationService {
  /**
   * List users's notification threads
   */
  notifyGetList(
    params: {
      /** If true, show notifications marked as read. Default value is false */
      all?: boolean;
      /** Show notifications with the provided status types. Options are: unread, read and/or pinned. Defaults to unread & pinned. */
      statusTypes?: string[];
      /** filter notifications by subject type */
      subjectType?: string[];
      /** Only show notifications updated after the given time. This is a timestamp in RFC 3339 format */
      since?: string;
      /** Only show notifications updated before the given time. This is a timestamp in RFC 3339 format */
      before?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/notifications';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        all: params['all'],
        'status-types': params['statusTypes'],
        'subject-type': params['subjectType'],
        since: params['since'],
        before: params['before'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Mark notification threads as read, pinned or unread
   */
  notifyReadList(
    params: {
      /** Describes the last point that notifications were checked. Anything updated since this time will not be updated. */
      lastReadAt?: string;
      /** If true, mark all notifications on this repo. Default value is false */
      all?: string;
      /** Mark notifications with the provided status types. Options are: unread, read and/or pinned. Defaults to unread. */
      statusTypes?: string[];
      /** Status to mark notifications as, Defaults to read. */
      toStatus?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/notifications';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);
      configs.params = {
        last_read_at: params['lastReadAt'],
        all: params['all'],
        'status-types': params['statusTypes'],
        'to-status': params['toStatus']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if unread notifications exist
   */
  notifyNewAvailable(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/notifications/new';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get notification thread by ID
   */
  notifyGetThread(
    params: {
      /** id of notification thread */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/notifications/threads/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Mark notification thread as read by ID
   */
  notifyReadThread(
    params: {
      /** id of notification thread */
      id: string;
      /** Status to mark notifications as */
      toStatus?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/notifications/threads/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);
      configs.params = { 'to-status': params['toStatus'] };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List users's notification threads on a specific repo
   */
  notifyGetRepoList(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** If true, show notifications marked as read. Default value is false */
      all?: boolean;
      /** Show notifications with the provided status types. Options are: unread, read and/or pinned. Defaults to unread & pinned */
      statusTypes?: string[];
      /** filter notifications by subject type */
      subjectType?: string[];
      /** Only show notifications updated after the given time. This is a timestamp in RFC 3339 format */
      since?: string;
      /** Only show notifications updated before the given time. This is a timestamp in RFC 3339 format */
      before?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/notifications';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        all: params['all'],
        'status-types': params['statusTypes'],
        'subject-type': params['subjectType'],
        since: params['since'],
        before: params['before'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Mark notification threads as read, pinned or unread on a specific repo
   */
  notifyReadRepoList(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** If true, mark all notifications on this repo. Default value is false */
      all?: string;
      /** Mark notifications with the provided status types. Options are: unread, read and/or pinned. Defaults to unread. */
      statusTypes?: string[];
      /** Status to mark notifications as. Defaults to read. */
      toStatus?: string;
      /** Describes the last point that notifications were checked. Anything updated since this time will not be updated. */
      lastReadAt?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/notifications';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);
      configs.params = {
        all: params['all'],
        'status-types': params['statusTypes'],
        'to-status': params['toStatus'],
        last_read_at: params['lastReadAt']
      };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class OrganizationService {
  /**
   * Create a repository in an organization
   */
  createOrgRepoDeprecated(
    params: {
      /** name of organization */
      org: string;
      /**  */
      body?: CreateRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/org/{org}/repos';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get list of organizations
   */
  orgGetAll(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create an organization
   */
  orgCreate(
    params: {
      /**  */
      organization: CreateOrgOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['organization'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get an organization
   */
  orgGet(
    params: {
      /** name of the organization to get */
      org: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete an organization
   */
  orgDelete(
    params: {
      /** organization that is to be deleted */
      org: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit an organization
   */
  orgEdit(
    params: {
      /** name of the organization to edit */
      org: string;
      /**  */
      body: EditOrgOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List an organization's webhooks
   */
  orgListHooks(
    params: {
      /** name of the organization */
      org: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/hooks';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a hook
   */
  orgCreateHook(
    params: {
      /** name of the organization */
      org: string;
      /**  */
      body: CreateHookOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/hooks/';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a hook
   */
  orgGetHook(
    params: {
      /** name of the organization */
      org: string;
      /** id of the hook to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/hooks/{id}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a hook
   */
  orgDeleteHook(
    params: {
      /** name of the organization */
      org: string;
      /** id of the hook to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/hooks/{id}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update a hook
   */
  orgEditHook(
    params: {
      /** name of the organization */
      org: string;
      /** id of the hook to update */
      id: number;
      /**  */
      body?: EditHookOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/hooks/{id}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List an organization's labels
   */
  orgListLabels(
    params: {
      /** name of the organization */
      org: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/labels';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a label for an organization
   */
  orgCreateLabel(
    params: {
      /** name of the organization */
      org: string;
      /**  */
      body?: CreateLabelOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/labels';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a single label
   */
  orgGetLabel(
    params: {
      /** name of the organization */
      org: string;
      /** id of the label to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/labels/{id}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a label
   */
  orgDeleteLabel(
    params: {
      /** name of the organization */
      org: string;
      /** id of the label to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/labels/{id}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update a label
   */
  orgEditLabel(
    params: {
      /** name of the organization */
      org: string;
      /** id of the label to edit */
      id: number;
      /**  */
      body?: EditLabelOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/labels/{id}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List an organization's members
   */
  orgListMembers(
    params: {
      /** name of the organization */
      org: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/members';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if a user is a member of an organization
   */
  orgIsMember(
    params: {
      /** name of the organization */
      org: string;
      /** username of the user */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/members/{username}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove a member from an organization
   */
  orgDeleteMember(
    params: {
      /** name of the organization */
      org: string;
      /** username of the user */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/members/{username}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List an organization's public members
   */
  orgListPublicMembers(
    params: {
      /** name of the organization */
      org: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/public_members';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if a user is a public member of an organization
   */
  orgIsPublicMember(
    params: {
      /** name of the organization */
      org: string;
      /** username of the user */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/public_members/{username}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Publicize a user's membership
   */
  orgPublicizeMember(
    params: {
      /** name of the organization */
      org: string;
      /** username of the user */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/public_members/{username}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Conceal a user's membership
   */
  orgConcealMember(
    params: {
      /** name of the organization */
      org: string;
      /** username of the user */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/public_members/{username}';
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List an organization's repos
   */
  orgListRepos(
    params: {
      /** name of the organization */
      org: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/repos';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a repository in an organization
   */
  createOrgRepo(
    params: {
      /** name of organization */
      org: string;
      /**  */
      body?: CreateRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/repos';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List an organization's teams
   */
  orgListTeams(
    params: {
      /** name of the organization */
      org: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/teams';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a team
   */
  orgCreateTeam(
    params: {
      /** name of the organization */
      org: string;
      /**  */
      body?: CreateTeamOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/teams';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Search for teams within an organization
   */
  teamSearch(
    params: {
      /** name of the organization */
      org: string;
      /** keywords to search */
      q?: string;
      /** include search within team description (defaults to true) */
      includeDesc?: boolean;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/orgs/{org}/teams/search';
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        q: params['q'],
        include_desc: params['includeDesc'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a team
   */
  orgGetTeam(
    params: {
      /** id of the team to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a team
   */
  orgDeleteTeam(
    params: {
      /** id of the team to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a team
   */
  orgEditTeam(
    params: {
      /** id of the team to edit */
      id: number;
      /**  */
      body?: EditTeamOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a team's members
   */
  orgListTeamMembers(
    params: {
      /** id of the team */
      id: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}/members';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a particular member of team
   */
  orgListTeamMember(
    params: {
      /** id of the team */
      id: number;
      /** username of the member to list */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}/members/{username}';
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a team member
   */
  orgAddTeamMember(
    params: {
      /** id of the team */
      id: number;
      /** username of the user to add */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}/members/{username}';
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove a team member
   */
  orgRemoveTeamMember(
    params: {
      /** id of the team */
      id: number;
      /** username of the user to remove */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}/members/{username}';
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a team's repos
   */
  orgListTeamRepos(
    params: {
      /** id of the team */
      id: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}/repos';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a repository to a team
   */
  orgAddTeamRepository(
    params: {
      /** id of the team */
      id: number;
      /** organization that owns the repo to add */
      org: string;
      /** name of the repo to add */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}/repos/{org}/{repo}';
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove a repository from a team
   */
  orgRemoveTeamRepository(
    params: {
      /** id of the team */
      id: number;
      /** organization that owns the repo to remove */
      org: string;
      /** name of the repo to remove */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teams/{id}/repos/{org}/{repo}';
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{org}', params['org'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the current user's organizations
   */
  orgListCurrentUserOrgs(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/orgs';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a user's organizations
   */
  orgListUserOrgs(
    params: {
      /** username of user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/orgs';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get user permissions in organization
   */
  orgGetUserPermissions(
    params: {
      /** username of user */
      username: string;
      /** name of the organization */
      org: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/orgs/{org}/permissions';
      url = url.replace('{username}', params['username'] + '');
      url = url.replace('{org}', params['org'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class IssueService {
  /**
   * Search for issues across the repositories that the user has access to
   */
  issueSearchIssues(
    params: {
      /** whether issue is open or closed */
      state?: string;
      /** comma separated list of labels. Fetch only issues that have any of this labels. Non existent labels are discarded */
      labels?: string;
      /** comma separated list of milestone names. Fetch only issues that have any of this milestones. Non existent are discarded */
      milestones?: string;
      /** search string */
      q?: string;
      /** repository to prioritize in the results */
      priorityRepoId?: number;
      /** filter by type (issues / pulls) if set */
      type?: string;
      /** Only show notifications updated after the given time. This is a timestamp in RFC 3339 format */
      since?: string;
      /** Only show notifications updated before the given time. This is a timestamp in RFC 3339 format */
      before?: string;
      /** filter (issues / pulls) assigned to you, default is false */
      assigned?: boolean;
      /** filter (issues / pulls) created by you, default is false */
      created?: boolean;
      /** filter (issues / pulls) mentioning you, default is false */
      mentioned?: boolean;
      /** filter pulls requesting your review, default is false */
      reviewRequested?: boolean;
      /** filter by owner */
      owner?: string;
      /** filter by team (requires organization owner parameter to be provided) */
      team?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/issues/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        state: params['state'],
        labels: params['labels'],
        milestones: params['milestones'],
        q: params['q'],
        priority_repo_id: params['priorityRepoId'],
        type: params['type'],
        since: params['since'],
        before: params['before'],
        assigned: params['assigned'],
        created: params['created'],
        mentioned: params['mentioned'],
        review_requested: params['reviewRequested'],
        owner: params['owner'],
        team: params['team'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repository's issues
   */
  issueListIssues(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** whether issue is open or closed */
      state?: string;
      /** comma separated list of labels. Fetch only issues that have any of this labels. Non existent labels are discarded */
      labels?: string;
      /** search string */
      q?: string;
      /** filter by type (issues / pulls) if set */
      type?: string;
      /** comma separated list of milestone names or ids. It uses names and fall back to ids. Fetch only issues that have any of this milestones. Non existent milestones are discarded */
      milestones?: string;
      /** Only show items updated after the given time. This is a timestamp in RFC 3339 format */
      since?: string;
      /** Only show items updated before the given time. This is a timestamp in RFC 3339 format */
      before?: string;
      /** Only show items which were created by the the given user */
      createdBy?: string;
      /** Only show items for which the given user is assigned */
      assignedBy?: string;
      /** Only show items in which the given user was mentioned */
      mentionedBy?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        state: params['state'],
        labels: params['labels'],
        q: params['q'],
        type: params['type'],
        milestones: params['milestones'],
        since: params['since'],
        before: params['before'],
        created_by: params['createdBy'],
        assigned_by: params['assignedBy'],
        mentioned_by: params['mentionedBy'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create an issue. If using deadline only the date will be taken into account, and time of day ignored.
   */
  issueCreateIssue(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateIssueOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List all comments in a repository
   */
  issueGetRepoComments(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** if provided, only comments updated since the provided time are returned. */
      since?: string;
      /** if provided, only comments updated before the provided time are returned. */
      before?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/comments';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        since: params['since'],
        before: params['before'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a comment
   */
  issueGetComment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the comment */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/comments/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a comment
   */
  issueDeleteComment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of comment to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/comments/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a comment
   */
  issueEditComment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the comment to edit */
      id: number;
      /**  */
      body?: EditIssueCommentOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/comments/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a list of reactions from a comment of an issue
   */
  issueGetCommentReactions(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the comment to edit */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/comments/{id}/reactions';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a reaction to a comment of an issue
   */
  issuePostCommentReaction(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the comment to edit */
      id: number;
      /**  */
      content?: EditReactionOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/comments/{id}/reactions';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['content'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove a reaction from a comment of an issue
   */
  issueDeleteCommentReaction(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the comment to edit */
      id: number;
      /**  */
      content?: EditReactionOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/comments/{id}/reactions';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = params['content'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get an issue
   */
  issueGetIssue(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue to get */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit an issue. If using deadline only the date will be taken into account, and time of day ignored.
   */
  issueEditIssue(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue to edit */
      index: number;
      /**  */
      body?: EditIssueOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List all comments on an issue
   */
  issueGetComments(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** if provided, only comments updated since the specified time are returned. */
      since?: string;
      /** if provided, only comments updated before the provided time are returned. */
      before?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/comments';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { since: params['since'], before: params['before'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a comment to an issue
   */
  issueCreateComment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /**  */
      body?: CreateIssueCommentOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/comments';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a comment
   */
  issueDeleteCommentDeprecated(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** this parameter is ignored */
      index: number;
      /** id of comment to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/comments/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a comment
   */
  issueEditCommentDeprecated(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** this parameter is ignored */
      index: number;
      /** id of the comment to edit */
      id: number;
      /**  */
      body?: EditIssueCommentOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/comments/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Set an issue deadline. If set to null, the deadline is deleted. If using deadline only the date will be taken into account, and time of day ignored.
   */
  issueEditIssueDeadline(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue to create or update a deadline on */
      index: number;
      /**  */
      body?: EditDeadlineOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/deadline';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get an issue's labels
   */
  issueGetLabels(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/labels';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Replace an issue's labels
   */
  issueReplaceLabels(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /**  */
      body?: IssueLabelsOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/labels';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a label to an issue
   */
  issueAddLabel(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /**  */
      body?: IssueLabelsOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/labels';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove all labels from an issue
   */
  issueClearLabels(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/labels';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove a label from an issue
   */
  issueRemoveLabel(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** id of the label to remove */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/labels/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a list reactions of an issue
   */
  issueGetIssueReactions(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/reactions';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a reaction to an issue
   */
  issuePostIssueReaction(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /**  */
      content?: EditReactionOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/reactions';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['content'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove a reaction from an issue
   */
  issueDeleteIssueReaction(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /**  */
      content?: EditReactionOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/reactions';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = params['content'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete an issue's existing stopwatch.
   */
  issueDeleteStopWatch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue to stop the stopwatch on */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/stopwatch/delete';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Start stopwatch on an issue.
   */
  issueStartStopWatch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue to create the stopwatch on */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/stopwatch/start';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Stop an issue's existing stopwatch.
   */
  issueStopStopWatch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue to stop the stopwatch on */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/stopwatch/stop';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get users who subscribed on an issue.
   */
  issueSubscriptions(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/subscriptions';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if user is subscribed to an issue
   */
  issueCheckSubscription(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/subscriptions/check';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Subscribe user to issue
   */
  issueAddSubscription(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** user to subscribe */
      user: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/subscriptions/{user}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{user}', params['user'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Unsubscribe user from issue
   */
  issueDeleteSubscription(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** user witch unsubscribe */
      user: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/subscriptions/{user}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{user}', params['user'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List all comments and events on an issue
   */
  issueGetCommentsAndTimeline(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** if provided, only comments updated since the specified time are returned. */
      since?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
      /** if provided, only comments updated before the provided time are returned. */
      before?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/timeline';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        since: params['since'],
        page: params['page'],
        limit: params['limit'],
        before: params['before']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List an issue's tracked times
   */
  issueTrackedTimes(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** optional filter by user (available for issue managers) */
      user?: string;
      /** Only show times updated after the given time. This is a timestamp in RFC 3339 format */
      since?: string;
      /** Only show times updated before the given time. This is a timestamp in RFC 3339 format */
      before?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/times';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        user: params['user'],
        since: params['since'],
        before: params['before'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add tracked time to a issue
   */
  issueAddTime(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /**  */
      body?: AddTimeOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/times';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Reset a tracked time of an issue
   */
  issueResetTime(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue to add tracked time to */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/times';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete specific tracked time
   */
  issueDeleteTime(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the issue */
      index: number;
      /** id of time to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issues/{index}/times/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all of a repository's labels
   */
  issueListLabels(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/labels';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a label
   */
  issueCreateLabel(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateLabelOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/labels';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a single label
   */
  issueGetLabel(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the label to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/labels/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a label
   */
  issueDeleteLabel(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the label to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/labels/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update a label
   */
  issueEditLabel(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the label to edit */
      id: number;
      /**  */
      body?: EditLabelOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/labels/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all of a repository's opened milestones
   */
  issueGetMilestonesList(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** Milestone state, Recognised values are open, closed and all. Defaults to "open" */
      state?: string;
      /** filter by milestone name */
      name?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/milestones';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { state: params['state'], name: params['name'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a milestone
   */
  issueCreateMilestone(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateMilestoneOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/milestones';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a milestone
   */
  issueGetMilestone(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** the milestone to get, identified by ID and if not available by name */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/milestones/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a milestone
   */
  issueDeleteMilestone(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** the milestone to delete, identified by ID and if not available by name */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/milestones/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update a milestone
   */
  issueEditMilestone(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** the milestone to edit, identified by ID and if not available by name */
      id: string;
      /**  */
      body?: EditMilestoneOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/milestones/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class RepositoryService {
  /**
   * Migrate a remote git repository
   */
  repoMigrate(
    params: {
      /**  */
      body?: MigrateRepoOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/migrate';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Search for repositories
   */
  repoSearch(
    params: {
      /** keyword */
      q?: string;
      /** Limit search to repositories with keyword as topic */
      topic?: boolean;
      /** include search of keyword within repository description */
      includeDesc?: boolean;
      /** search only for repos that the user with the given id owns or contributes to */
      uid?: number;
      /** repo owner to prioritize in the results */
      priorityOwnerId?: number;
      /** search only for repos that belong to the given team id */
      teamId?: number;
      /** search only for repos that the user with the given id has starred */
      starredBy?: number;
      /** include private repositories this user has access to (defaults to true) */
      private?: boolean;
      /** show only pubic, private or all repositories (defaults to all) */
      isPrivate?: boolean;
      /** include template repositories this user has access to (defaults to true) */
      template?: boolean;
      /** show only archived, non-archived or all repositories (defaults to all) */
      archived?: boolean;
      /** type of repository to search for. Supported values are "fork", "source", "mirror" and "collaborative" */
      mode?: string;
      /** if `uid` is given, search only for repos that the user owns */
      exclusive?: boolean;
      /** sort repos by attribute. Supported values are "alpha", "created", "updated", "size", and "id". Default is "alpha" */
      sort?: string;
      /** sort order, either "asc" (ascending) or "desc" (descending). Default is "asc", ignored if "sort" is not specified. */
      order?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        q: params['q'],
        topic: params['topic'],
        includeDesc: params['includeDesc'],
        uid: params['uid'],
        priority_owner_id: params['priorityOwnerId'],
        team_id: params['teamId'],
        starredBy: params['starredBy'],
        private: params['private'],
        is_private: params['isPrivate'],
        template: params['template'],
        archived: params['archived'],
        mode: params['mode'],
        exclusive: params['exclusive'],
        sort: params['sort'],
        order: params['order'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a repository
   */
  repoGet(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a repository
   */
  repoDelete(
    params: {
      /** owner of the repo to delete */
      owner: string;
      /** name of the repo to delete */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a repository's properties. Only fields that are set will be changed.
   */
  repoEdit(
    params: {
      /** owner of the repo to edit */
      owner: string;
      /** name of the repo to edit */
      repo: string;
      /** Properties of a repo that you can edit */
      body?: EditRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get an archive of a repository
   */
  repoGetArchive(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** the git reference for download with attached archive format (e.g. master.zip) */
      archive: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/archive/{archive}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{archive}', params['archive'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Return all users that have write access and can be assigned to issues
   */
  repoGetAssignees(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/assignees';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List branch protections for a repository
   */
  repoListBranchProtection(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branch_protections';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a branch protections for a repository
   */
  repoCreateBranchProtection(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateBranchProtectionOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branch_protections';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a specific branch protection for the repository
   */
  repoGetBranchProtection(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of protected branch */
      name: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branch_protections/{name}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{name}', params['name'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a specific branch protection for the repository
   */
  repoDeleteBranchProtection(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of protected branch */
      name: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branch_protections/{name}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{name}', params['name'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a branch protections for a repository. Only fields that are set will be changed
   */
  repoEditBranchProtection(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of protected branch */
      name: string;
      /**  */
      body?: EditBranchProtectionOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branch_protections/{name}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{name}', params['name'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repository's branches
   */
  repoListBranches(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branches';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a branch
   */
  repoCreateBranch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateBranchRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branches';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Retrieve a specific branch from a repository, including its effective branch protection
   */
  repoGetBranch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** branch to get */
      branch: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branches/{branch}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{branch}', params['branch'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a specific branch from a repository
   */
  repoDeleteBranch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** branch to delete */
      branch: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/branches/{branch}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{branch}', params['branch'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repository's collaborators
   */
  repoListCollaborators(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/collaborators';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if a user is a collaborator of a repository
   */
  repoCheckCollaborator(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** username of the collaborator */
      collaborator: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/collaborators/{collaborator}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{collaborator}', params['collaborator'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a collaborator to a repository
   */
  repoAddCollaborator(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** username of the collaborator to add */
      collaborator: string;
      /**  */
      body?: AddCollaboratorOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/collaborators/{collaborator}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{collaborator}', params['collaborator'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a collaborator from a repository
   */
  repoDeleteCollaborator(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** username of the collaborator to delete */
      collaborator: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/collaborators/{collaborator}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{collaborator}', params['collaborator'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a list of all commits from a repository
   */
  repoGetAllCommits(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** SHA or branch to start listing commits from (usually 'master') */
      sha?: string;
      /** filepath of a file/dir */
      path?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results (ignored if used with 'path') */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/commits';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { sha: params['sha'], path: params['path'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a commit's combined status, by branch/tag/commit reference
   */
  repoGetCombinedStatusByRef(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of branch/tag/commit */
      ref: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/commits/{ref}/status';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{ref}', params['ref'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a commit's statuses, by branch/tag/commit reference
   */
  repoListStatusesByRef(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of branch/tag/commit */
      ref: string;
      /** type of sort */
      sort?: string;
      /** type of state */
      state?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/commits/{ref}/statuses';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{ref}', params['ref'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { sort: params['sort'], state: params['state'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Gets the metadata of all the entries of the root dir
   */
  repoGetContentsList(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** The name of the commit/branch/tag. Default the repository’s default branch (usually master) */
      ref?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/contents';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ref: params['ref'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Gets the metadata and contents (if a file) of an entry in a repository, or a list of entries if a dir
   */
  repoGetContents(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** path of the dir, file, symlink or submodule in the repo */
      filepath: string;
      /** The name of the commit/branch/tag. Default the repository’s default branch (usually master) */
      ref?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/contents/{filepath}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{filepath}', params['filepath'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ref: params['ref'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update a file in a repository
   */
  repoUpdateFile(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** path of the file to update */
      filepath: string;
      /**  */
      body: UpdateFileOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/contents/{filepath}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{filepath}', params['filepath'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a file in a repository
   */
  repoCreateFile(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** path of the file to create */
      filepath: string;
      /**  */
      body: CreateFileOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/contents/{filepath}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{filepath}', params['filepath'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a file in a repository
   */
  repoDeleteFile(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** path of the file to delete */
      filepath: string;
      /**  */
      body: DeleteFileOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/contents/{filepath}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{filepath}', params['filepath'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get the EditorConfig definitions of a file in a repository
   */
  repoGetEditorConfig(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** filepath of file to get */
      filepath: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/editorconfig/{filepath}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{filepath}', params['filepath'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repository's forks
   */
  listForks(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/forks';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Fork a repository
   */
  createFork(
    params: {
      /** owner of the repo to fork */
      owner: string;
      /** name of the repo to fork */
      repo: string;
      /**  */
      body?: CreateForkOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/forks';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Gets the blob of a repository.
   */
  getBlob(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** sha of the commit */
      sha: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/blobs/{sha}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a single commit from a repository
   */
  repoGetSingleCommit(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** a git ref or commit sha */
      sha: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/commits/{sha}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a commit's diff or patch
   */
  repoDownloadCommitDiffOrPatch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** SHA of the commit to get */
      sha: string;
      /** whether the output is diff or patch */
      diffType: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/commits/{sha}.{diffType}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');
      url = url.replace('{diffType}', params['diffType'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a note corresponding to a single commit from a repository
   */
  repoGetNote(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** a git ref or commit sha */
      sha: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/notes/{sha}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get specified ref or filtered repository's refs
   */
  repoListAllGitRefs(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/refs';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get specified ref or filtered repository's refs
   */
  repoListGitRefs(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** part or full name of the ref */
      ref: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/refs/{ref}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{ref}', params['ref'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Gets the tag object of an annotated tag (not lightweight tags)
   */
  getAnnotatedTag(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** sha of the tag. The Git tags API only supports annotated tag objects, not lightweight tags. */
      sha: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/tags/{sha}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Gets the tree of a repository.
   */
  getTree(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** sha of the commit */
      sha: string;
      /** show all directories and files */
      recursive?: boolean;
      /** page number; the 'truncated' field in the response will be true if there are still more items after this page, false if the last page */
      page?: number;
      /** number of items per page */
      perPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/git/trees/{sha}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { recursive: params['recursive'], page: params['page'], per_page: params['perPage'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the hooks in a repository
   */
  repoListHooks(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a hook
   */
  repoCreateHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateHookOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the Git hooks in a repository
   */
  repoListGitHooks(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/git';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a Git hook
   */
  repoGetGitHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the hook to get */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/git/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a Git hook in a repository
   */
  repoDeleteGitHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the hook to get */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/git/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a Git hook in a repository
   */
  repoEditGitHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the hook to get */
      id: string;
      /**  */
      body?: EditGitHookOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/git/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a hook
   */
  repoGetHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the hook to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a hook in a repository
   */
  repoDeleteHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the hook to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a hook in a repository
   */
  repoEditHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the hook */
      id: number;
      /**  */
      body?: EditHookOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Test a push webhook
   */
  repoTestHook(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the hook to test */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/hooks/{id}/tests';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get available issue templates for a repository
   */
  repoGetIssueTemplates(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/issue_templates';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repository's keys
   */
  repoListKeys(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** the key_id to search for */
      keyId?: number;
      /** fingerprint of the key */
      fingerprint?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/keys';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        key_id: params['keyId'],
        fingerprint: params['fingerprint'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a key to a repository
   */
  repoCreateKey(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateKeyOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/keys';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a repository's key by id
   */
  repoGetKey(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the key to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/keys/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a key from a repository
   */
  repoDeleteKey(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the key to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/keys/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get languages and number of bytes of code written
   */
  repoGetLanguages(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/languages';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sync a mirrored repository
   */
  repoMirrorSync(
    params: {
      /** owner of the repo to sync */
      owner: string;
      /** name of the repo to sync */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/mirror-sync';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repo's pull requests
   */
  repoListPullRequests(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** State of pull request: open or closed (optional) */
      state?: string;
      /** Type of sort */
      sort?: string;
      /** ID of the milestone */
      milestone?: number;
      /** Label IDs */
      labels?: number[];
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        state: params['state'],
        sort: params['sort'],
        milestone: params['milestone'],
        labels: params['labels'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a pull request
   */
  repoCreatePullRequest(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreatePullRequestOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a pull request
   */
  repoGetPullRequest(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request to get */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update a pull request. If using deadline only the date will be taken into account, and time of day ignored.
   */
  repoEditPullRequest(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request to edit */
      index: number;
      /**  */
      body?: EditPullRequestOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a pull request diff or patch
   */
  repoDownloadPullDiffOrPatch(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request to get */
      index: number;
      /** whether the output is diff or patch */
      diffType: string;
      /** whether to include binary file changes. if true, the diff is applicable with `git apply` */
      binary?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}.{diffType}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{diffType}', params['diffType'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { binary: params['binary'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get commits for a pull request
   */
  repoGetPullRequestCommits(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request to get */
      index: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/commits';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if a pull request has been merged
   */
  repoPullRequestIsMerged(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/merge';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Merge a pull request
   */
  repoMergePullRequest(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request to merge */
      index: number;
      /**  */
      body?: MergePullRequestOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/merge';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * create review requests for a pull request
   */
  repoCreatePullReviewRequests(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /**  */
      body: PullReviewRequestOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/requested_reviewers';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * cancel review requests for a pull request
   */
  repoDeletePullReviewRequests(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /**  */
      body: PullReviewRequestOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/requested_reviewers';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List all reviews for a pull request
   */
  repoListPullReviews(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a review to an pull request
   */
  repoCreatePullReview(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /**  */
      body: CreatePullReviewOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a specific review for a pull request
   */
  repoGetPullReview(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /** id of the review */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Submit a pending review to an pull request
   */
  repoSubmitPullReview(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /** id of the review */
      id: number;
      /**  */
      body: SubmitPullReviewOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a specific review from a pull request
   */
  repoDeletePullReview(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /** id of the review */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a specific review for a pull request
   */
  repoGetPullReviewComments(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /** id of the review */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/comments';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Dismiss a review for a pull request
   */
  repoDismissPullReview(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /** id of the review */
      id: number;
      /**  */
      body: DismissPullReviewOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/dismissals';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Cancel to dismiss a review for a pull request
   */
  repoUnDismissPullReview(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request */
      index: number;
      /** id of the review */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/undismissals';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Merge PR's baseBranch into headBranch
   */
  repoUpdatePullRequest(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** index of the pull request to get */
      index: number;
      /** how to update pull request */
      style?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/pulls/{index}/update';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{index}', params['index'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { style: params['style'] };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a file from a repository
   */
  repoGetRawFile(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** filepath of the file to get */
      filepath: string;
      /** The name of the commit/branch/tag. Default the repository’s default branch (usually master) */
      ref?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/raw/{filepath}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{filepath}', params['filepath'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ref: params['ref'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repo's releases
   */
  repoListReleases(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** filter (exclude / include) drafts, if you dont have repo write access none will show */
      draft?: boolean;
      /** filter (exclude / include) pre-releases */
      preRelease?: boolean;
      /** page size of results, deprecated - use limit */
      perPage?: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        draft: params['draft'],
        'pre-release': params['preRelease'],
        per_page: params['perPage'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a release
   */
  repoCreateRelease(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateReleaseOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a release by tag name
   */
  repoGetReleaseByTag(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** tag name of the release to get */
      tag: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/tags/{tag}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{tag}', params['tag'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a release by tag name
   */
  repoDeleteReleaseByTag(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** tag name of the release to delete */
      tag: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/tags/{tag}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{tag}', params['tag'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a release
   */
  repoGetRelease(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a release
   */
  repoDeleteRelease(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update a release
   */
  repoEditRelease(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release to edit */
      id: number;
      /**  */
      body?: EditReleaseOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List release's attachments
   */
  repoListReleaseAttachments(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}/assets';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a release attachment
   */
  repoCreateReleaseAttachment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release */
      id: number;
      /** name of the attachment */
      name?: string;
      /** attachment to upload */
      attachment: any;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}/assets';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'multipart/form-data', url, options);
      configs.params = { name: params['name'] };

      let data = null;
      data = new FormData();
      if (params['attachment']) {
        if (Object.prototype.toString.call(params['attachment']) === '[object Array]') {
          for (const item of params['attachment']) {
            data.append('attachment', item as any);
          }
        } else {
          data.append('attachment', params['attachment'] as any);
        }
      }

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a release attachment
   */
  repoGetReleaseAttachment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release */
      id: number;
      /** id of the attachment to get */
      attachmentId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{attachment_id}', params['attachmentId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a release attachment
   */
  repoDeleteReleaseAttachment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release */
      id: number;
      /** id of the attachment to delete */
      attachmentId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{attachment_id}', params['attachmentId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a release attachment
   */
  repoEditReleaseAttachment(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** id of the release */
      id: number;
      /** id of the attachment to edit */
      attachmentId: number;
      /**  */
      body?: EditAttachmentOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{id}', params['id'] + '');
      url = url.replace('{attachment_id}', params['attachmentId'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Return all users that can be requested to review in this repo
   */
  repoGetReviewers(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/reviewers';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get signing-key.gpg for given repository
   */
  repoSigningKey(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/signing-key.gpg';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repo's stargazers
   */
  repoListStargazers(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/stargazers';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a commit's statuses
   */
  repoListStatuses(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** sha of the commit */
      sha: string;
      /** type of sort */
      sort?: string;
      /** type of state */
      state?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/statuses/{sha}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { sort: params['sort'], state: params['state'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a commit status
   */
  repoCreateStatus(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** sha of the commit */
      sha: string;
      /**  */
      body?: CreateStatusOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/statuses/{sha}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{sha}', params['sha'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repo's watchers
   */
  repoListSubscribers(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/subscribers';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if the current user is watching a repo
   */
  userCurrentCheckSubscription(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/subscription';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Watch a repo
   */
  userCurrentPutSubscription(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/subscription';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Unwatch a repo
   */
  userCurrentDeleteSubscription(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/subscription';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repository's tags
   */
  repoListTags(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results, default maximum page size is 50 */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/tags';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a new git tag in a repository
   */
  repoCreateTag(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateTagOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/tags';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get the tag of a repository by tag name
   */
  repoGetTag(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of tag */
      tag: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/tags/{tag}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{tag}', params['tag'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a repository's tag by name
   */
  repoDeleteTag(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of tag to delete */
      tag: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/tags/{tag}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{tag}', params['tag'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repository's teams
   */
  repoListTeams(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/teams';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if a team is assigned to a repository
   */
  repoCheckTeam(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** team name */
      team: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/teams/{team}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{team}', params['team'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a team to a repository
   */
  repoAddTeam(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** team name */
      team: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/teams/{team}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{team}', params['team'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a team from a repository
   */
  repoDeleteTeam(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** team name */
      team: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/teams/{team}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{team}', params['team'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a repo's tracked times
   */
  repoTrackedTimes(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** optional filter by user (available for issue managers) */
      user?: string;
      /** Only show times updated after the given time. This is a timestamp in RFC 3339 format */
      since?: string;
      /** Only show times updated before the given time. This is a timestamp in RFC 3339 format */
      before?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/times';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        user: params['user'],
        since: params['since'],
        before: params['before'],
        page: params['page'],
        limit: params['limit']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List a user's tracked times in a repo
   */
  userTrackedTimes(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** username of user */
      user: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/times/{user}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{user}', params['user'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get list of topics that a repository has
   */
  repoListTopics(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/topics';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Replace list of topics for a repository
   */
  repoUpdateTopics(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: RepoTopicOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/topics';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add a topic to a repository
   */
  repoAddTopic(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of the topic to add */
      topic: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/topics/{topic}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{topic}', params['topic'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a topic from a repository
   */
  repoDeleteTopic(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of the topic to delete */
      topic: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/topics/{topic}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{topic}', params['topic'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Transfer a repo ownership
   */
  repoTransfer(
    params: {
      /** owner of the repo to transfer */
      owner: string;
      /** name of the repo to transfer */
      repo: string;
      /** Transfer Options */
      body: TransferRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/transfer';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Accept a repo transfer
   */
  acceptRepoTransfer(
    params: {
      /** owner of the repo to transfer */
      owner: string;
      /** name of the repo to transfer */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/transfer/accept';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Reject a repo transfer
   */
  rejectRepoTransfer(
    params: {
      /** owner of the repo to transfer */
      owner: string;
      /** name of the repo to transfer */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/transfer/reject';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a wiki page
   */
  repoCreateWikiPage(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /**  */
      body?: CreateWikiPageOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/wiki/new';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a wiki page
   */
  repoGetWikiPage(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of the page */
      pageName: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/wiki/page/{pageName}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{pageName}', params['pageName'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a wiki page
   */
  repoDeleteWikiPage(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of the page */
      pageName: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/wiki/page/{pageName}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{pageName}', params['pageName'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Edit a wiki page
   */
  repoEditWikiPage(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of the page */
      pageName: string;
      /**  */
      body?: CreateWikiPageOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/wiki/page/{pageName}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{pageName}', params['pageName'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all wiki pages
   */
  repoGetWikiPages(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/wiki/pages';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get revisions of a wiki page
   */
  repoGetWikiPageRevisions(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
      /** name of the page */
      pageName: string;
      /** page number of results to return (1-based) */
      page?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{owner}/{repo}/wiki/revisions/{pageName}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');
      url = url.replace('{pageName}', params['pageName'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a repository using a template
   */
  generateRepo(
    params: {
      /** name of the template repository owner */
      templateOwner: string;
      /** name of the template repository */
      templateRepo: string;
      /**  */
      body?: GenerateRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repos/{template_owner}/{template_repo}/generate';
      url = url.replace('{template_owner}', params['templateOwner'] + '');
      url = url.replace('{template_repo}', params['templateRepo'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a repository by id
   */
  repoGetById(
    params: {
      /** id of the repo to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repositories/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * search topics via keyword
   */
  topicSearch(
    params: {
      /** keywords to search */
      q: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/topics/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { q: params['q'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a repository
   */
  createCurrentUserRepo(
    params: {
      /**  */
      body?: CreateRepoOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/repos';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class SettingsService {
  /**
   * Get instance's global settings for api
   */
  getGeneralApiSettings(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/settings/api';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get instance's global settings for Attachment
   */
  getGeneralAttachmentSettings(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/settings/attachment';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get instance's global settings for repositories
   */
  getGeneralRepositorySettings(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/settings/repository';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get instance's global settings for ui
   */
  getGeneralUiSettings(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/settings/ui';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class UserService {
  /**
   * Get the authenticated user
   */
  userGetCurrent(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the authenticated user's oauth2 applications
   */
  userGetOauth2Application(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/applications/oauth2';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * creates a new OAuth2 application
   */
  userCreateOAuth2Application(
    params: {
      /**  */
      body: CreateOAuth2ApplicationOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/applications/oauth2';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * get an OAuth2 Application
   */
  userGetOAuth2Application(
    params: {
      /** Application ID to be found */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/applications/oauth2/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * delete an OAuth2 Application
   */
  userDeleteOAuth2Application(
    params: {
      /** token to be deleted */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/applications/oauth2/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * update an OAuth2 Application, this includes regenerating the client secret
   */
  userUpdateOAuth2Application(
    params: {
      /** application to be updated */
      id: number;
      /**  */
      body: CreateOAuth2ApplicationOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/applications/oauth2/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the authenticated user's email addresses
   */
  userListEmails(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/emails';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Add email addresses
   */
  userAddEmail(
    params: {
      /**  */
      body?: CreateEmailOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/emails';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete email addresses
   */
  userDeleteEmail(
    params: {
      /**  */
      body?: DeleteEmailOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/emails';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the authenticated user's followers
   */
  userCurrentListFollowers(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/followers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the users that the authenticated user is following
   */
  userCurrentListFollowing(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/following';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check whether a user is followed by the authenticated user
   */
  userCurrentCheckFollowing(
    params: {
      /** username of followed user */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/following/{username}';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Follow a user
   */
  userCurrentPutFollow(
    params: {
      /** username of user to follow */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/following/{username}';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Unfollow a user
   */
  userCurrentDeleteFollow(
    params: {
      /** username of user to unfollow */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/following/{username}';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a Token to verify
   */
  getVerificationToken(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/gpg_key_token';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Verify a GPG key
   */
  userVerifyGpgKey(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/gpg_key_verify';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the authenticated user's GPG keys
   */
  userCurrentListGpgKeys(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/gpg_keys';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a GPG key
   */
  userCurrentPostGpgKey(
    params: {
      /**  */
      form?: CreateGPGKeyOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/gpg_keys';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['form'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a GPG key
   */
  userCurrentGetGpgKey(
    params: {
      /** id of key to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/gpg_keys/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove a GPG key
   */
  userCurrentDeleteGpgKey(
    params: {
      /** id of key to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/gpg_keys/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the authenticated user's public keys
   */
  userCurrentListKeys(
    params: {
      /** fingerprint of the key */
      fingerprint?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/keys';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { fingerprint: params['fingerprint'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create a public key
   */
  userCurrentPostKey(
    params: {
      /**  */
      body?: CreateKeyOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/keys';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a public key
   */
  userCurrentGetKey(
    params: {
      /** id of key to get */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/keys/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete a public key
   */
  userCurrentDeleteKey(
    params: {
      /** id of key to delete */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/keys/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the repos that the authenticated user owns
   */
  userCurrentListRepos(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/repos';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get user settings
   */
  getUserSettings(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/settings';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update user settings
   */
  updateUserSettings(
    params: {
      /**  */
      body?: UserSettingsOptions;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/settings';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params['body'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * The repos that the authenticated user has starred
   */
  userCurrentListStarred(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/starred';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Whether the authenticated is starring the repo
   */
  userCurrentCheckStarring(
    params: {
      /** owner of the repo */
      owner: string;
      /** name of the repo */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/starred/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Star the given repo
   */
  userCurrentPutStar(
    params: {
      /** owner of the repo to star */
      owner: string;
      /** name of the repo to star */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/starred/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Unstar the given repo
   */
  userCurrentDeleteStar(
    params: {
      /** owner of the repo to unstar */
      owner: string;
      /** name of the repo to unstar */
      repo: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/starred/{owner}/{repo}';
      url = url.replace('{owner}', params['owner'] + '');
      url = url.replace('{repo}', params['repo'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get list of all existing stopwatches
   */
  userGetStopWatches(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/stopwatches';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List repositories watched by the authenticated user
   */
  userCurrentListSubscriptions(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/subscriptions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List all the teams a user belongs to
   */
  userListTeams(
    params: {
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/teams';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the current user's tracked times
   */
  userCurrentTrackedTimes(
    params: {
      /** Only show times updated after the given time. This is a timestamp in RFC 3339 format */
      since?: string;
      /** Only show times updated before the given time. This is a timestamp in RFC 3339 format */
      before?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/times';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { since: params['since'], before: params['before'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Search for users
   */
  userSearch(
    params: {
      /** keyword */
      q?: string;
      /** ID of the user to search for */
      uid?: number;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { q: params['q'], uid: params['uid'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check if one user is following another user
   */
  userCheckFollowing(
    params: {
      /** username of following user */
      follower: string;
      /** username of followed user */
      followee: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{follower}/following/{followee}';
      url = url.replace('{follower}', params['follower'] + '');
      url = url.replace('{followee}', params['followee'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a user
   */
  userGet(
    params: {
      /** username of user to get */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the given user's followers
   */
  userListFollowers(
    params: {
      /** username of user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/followers';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the users that the given user is following
   */
  userListFollowing(
    params: {
      /** username of user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/following';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the given user's GPG keys
   */
  userListGpgKeys(
    params: {
      /** username of user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/gpg_keys';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get a user's heatmap
   */
  userGetHeatmapData(
    params: {
      /** username of user to get */
      username: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/heatmap';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the given user's public keys
   */
  userListKeys(
    params: {
      /** username of user */
      username: string;
      /** fingerprint of the key */
      fingerprint?: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/keys';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { fingerprint: params['fingerprint'], page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the repos owned by the given user
   */
  userListRepos(
    params: {
      /** username of user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/repos';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * The repos that the given user has starred
   */
  userListStarred(
    params: {
      /** username of user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/starred';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the repositories watched by a user
   */
  userListSubscriptions(
    params: {
      /** username of the user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/subscriptions';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * List the authenticated user's access tokens
   */
  userGetTokens(
    params: {
      /** username of user */
      username: string;
      /** page number of results to return (1-based) */
      page?: number;
      /** page size of results */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/tokens';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], limit: params['limit'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create an access token
   */
  userCreateToken(
    params: {
      /** username of user */
      username: string;
      /**  */
      userCreateToken?: CreateAccessTokenOption;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/tokens';
      url = url.replace('{username}', params['username'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['userCreateToken'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * delete an access token
   */
  userDeleteAccessToken(
    params: {
      /** username of user */
      username: string;
      /** token to be deleted, identified by ID and if not available by name */
      token: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/users/{username}/tokens/{token}';
      url = url.replace('{username}', params['username'] + '');
      url = url.replace('{token}', params['token'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface APIError {
  /**  */
  message?: string;

  /**  */
  url?: string;
}

export interface AccessToken {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  sha1?: string;

  /**  */
  token_last_eight?: string;
}

export interface AddCollaboratorOption {
  /**  */
  permission?: string;
}

export interface AddTimeOption {
  /**  */
  created?: Date;

  /** time in seconds */
  time?: number;

  /** User who spent the time (optional) */
  user_name?: string;
}

export interface AnnotatedTag {
  /**  */
  message?: string;

  /**  */
  object?: AnnotatedTagObject;

  /**  */
  sha?: string;

  /**  */
  tag?: string;

  /**  */
  tagger?: CommitUser;

  /**  */
  url?: string;

  /**  */
  verification?: PayloadCommitVerification;
}

export interface AnnotatedTagObject {
  /**  */
  sha?: string;

  /**  */
  type?: string;

  /**  */
  url?: string;
}

export interface Attachment {
  /**  */
  browser_download_url?: string;

  /**  */
  created_at?: Date;

  /**  */
  download_count?: number;

  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  size?: number;

  /**  */
  uuid?: string;
}

export interface Branch {
  /**  */
  commit?: PayloadCommit;

  /**  */
  effective_branch_protection_name?: string;

  /**  */
  enable_status_check?: boolean;

  /**  */
  name?: string;

  /**  */
  protected?: boolean;

  /**  */
  required_approvals?: number;

  /**  */
  status_check_contexts?: string[];

  /**  */
  user_can_merge?: boolean;

  /**  */
  user_can_push?: boolean;
}

export interface BranchProtection {
  /**  */
  approvals_whitelist_teams?: string[];

  /**  */
  approvals_whitelist_username?: string[];

  /**  */
  block_on_official_review_requests?: boolean;

  /**  */
  block_on_outdated_branch?: boolean;

  /**  */
  block_on_rejected_reviews?: boolean;

  /**  */
  branch_name?: string;

  /**  */
  created_at?: Date;

  /**  */
  dismiss_stale_approvals?: boolean;

  /**  */
  enable_approvals_whitelist?: boolean;

  /**  */
  enable_merge_whitelist?: boolean;

  /**  */
  enable_push?: boolean;

  /**  */
  enable_push_whitelist?: boolean;

  /**  */
  enable_status_check?: boolean;

  /**  */
  merge_whitelist_teams?: string[];

  /**  */
  merge_whitelist_usernames?: string[];

  /**  */
  protected_file_patterns?: string;

  /**  */
  push_whitelist_deploy_keys?: boolean;

  /**  */
  push_whitelist_teams?: string[];

  /**  */
  push_whitelist_usernames?: string[];

  /**  */
  require_signed_commits?: boolean;

  /**  */
  required_approvals?: number;

  /**  */
  status_check_contexts?: string[];

  /**  */
  unprotected_file_patterns?: string;

  /**  */
  updated_at?: Date;
}

export interface CombinedStatus {
  /**  */
  commit_url?: string;

  /**  */
  repository?: Repository;

  /**  */
  sha?: string;

  /**  */
  state?: CommitStatusState;

  /**  */
  statuses?: CommitStatus[];

  /**  */
  total_count?: number;

  /**  */
  url?: string;
}

export interface Comment {
  /**  */
  body?: string;

  /**  */
  created_at?: Date;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  issue_url?: string;

  /**  */
  original_author?: string;

  /**  */
  original_author_id?: number;

  /**  */
  pull_request_url?: string;

  /**  */
  updated_at?: Date;

  /**  */
  user?: User;
}

export interface Commit {
  /**  */
  author?: User;

  /**  */
  commit?: RepoCommit;

  /**  */
  committer?: User;

  /**  */
  created?: Date;

  /**  */
  files?: CommitAffectedFiles[];

  /**  */
  html_url?: string;

  /**  */
  parents?: CommitMeta[];

  /**  */
  sha?: string;

  /**  */
  url?: string;
}

export interface CommitAffectedFiles {
  /**  */
  filename?: string;
}

export interface CommitDateOptions {
  /**  */
  author?: Date;

  /**  */
  committer?: Date;
}

export interface CommitMeta {
  /**  */
  created?: Date;

  /**  */
  sha?: string;

  /**  */
  url?: string;
}

export interface CommitStatus {
  /**  */
  context?: string;

  /**  */
  created_at?: Date;

  /**  */
  creator?: User;

  /**  */
  description?: string;

  /**  */
  id?: number;

  /**  */
  status?: CommitStatusState;

  /**  */
  target_url?: string;

  /**  */
  updated_at?: Date;

  /**  */
  url?: string;
}

export interface CommitStatusState {}

export interface CommitUser {
  /**  */
  date?: string;

  /**  */
  email?: string;

  /**  */
  name?: string;
}

export interface ContentsResponse {
  /**  */
  _links?: FileLinksResponse;

  /** `content` is populated when `type` is `file`, otherwise null */
  content?: string;

  /**  */
  download_url?: string;

  /** `encoding` is populated when `type` is `file`, otherwise null */
  encoding?: string;

  /**  */
  git_url?: string;

  /**  */
  html_url?: string;

  /**  */
  name?: string;

  /**  */
  path?: string;

  /**  */
  sha?: string;

  /**  */
  size?: number;

  /** `submodule_git_url` is populated when `type` is `submodule`, otherwise null */
  submodule_git_url?: string;

  /** `target` is populated when `type` is `symlink`, otherwise null */
  target?: string;

  /** `type` will be `file`, `dir`, `symlink`, or `submodule` */
  type?: string;

  /**  */
  url?: string;
}

export interface CreateAccessTokenOption {
  /**  */
  name?: string;
}

export interface CreateBranchProtectionOption {
  /**  */
  approvals_whitelist_teams?: string[];

  /**  */
  approvals_whitelist_username?: string[];

  /**  */
  block_on_official_review_requests?: boolean;

  /**  */
  block_on_outdated_branch?: boolean;

  /**  */
  block_on_rejected_reviews?: boolean;

  /**  */
  branch_name?: string;

  /**  */
  dismiss_stale_approvals?: boolean;

  /**  */
  enable_approvals_whitelist?: boolean;

  /**  */
  enable_merge_whitelist?: boolean;

  /**  */
  enable_push?: boolean;

  /**  */
  enable_push_whitelist?: boolean;

  /**  */
  enable_status_check?: boolean;

  /**  */
  merge_whitelist_teams?: string[];

  /**  */
  merge_whitelist_usernames?: string[];

  /**  */
  protected_file_patterns?: string;

  /**  */
  push_whitelist_deploy_keys?: boolean;

  /**  */
  push_whitelist_teams?: string[];

  /**  */
  push_whitelist_usernames?: string[];

  /**  */
  require_signed_commits?: boolean;

  /**  */
  required_approvals?: number;

  /**  */
  status_check_contexts?: string[];

  /**  */
  unprotected_file_patterns?: string;
}

export interface CreateBranchRepoOption {
  /** Name of the branch to create */
  new_branch_name?: string;

  /** Name of the old branch to create from */
  old_branch_name?: string;
}

export interface CreateEmailOption {
  /** email addresses to add */
  emails?: string[];
}

export interface CreateFileOptions {
  /**  */
  author?: Identity;

  /** branch (optional) to base this file from. if not given, the default branch is used */
  branch?: string;

  /**  */
  committer?: Identity;

  /** content must be base64 encoded */
  content?: string;

  /**  */
  dates?: CommitDateOptions;

  /** message (optional) for the commit of this file. if not supplied, a default message will be used */
  message?: string;

  /** new_branch (optional) will make a new branch from `branch` before creating the file */
  new_branch?: string;

  /** Add a Signed-off-by trailer by the committer at the end of the commit log message. */
  signoff?: boolean;
}

export interface CreateForkOption {
  /** name of the forked repository */
  name?: string;

  /** organization name, if forking into an organization */
  organization?: string;
}

export interface CreateGPGKeyOption {
  /** An armored GPG key to add */
  armored_public_key?: string;

  /**  */
  armored_signature?: string;
}

export interface CreateHookOption {
  /**  */
  active?: boolean;

  /**  */
  branch_filter?: string;

  /**  */
  config?: CreateHookOptionConfig;

  /**  */
  events?: string[];

  /**  */
  type?: EnumCreateHookOptionType;
}

export interface CreateHookOptionConfig {}

export interface CreateIssueCommentOption {
  /**  */
  body?: string;
}

export interface CreateIssueOption {
  /** deprecated */
  assignee?: string;

  /**  */
  assignees?: string[];

  /**  */
  body?: string;

  /**  */
  closed?: boolean;

  /**  */
  due_date?: Date;

  /** list of label ids */
  labels?: number[];

  /** milestone id */
  milestone?: number;

  /**  */
  ref?: string;

  /**  */
  title?: string;
}

export interface CreateKeyOption {
  /** An armored SSH key to add */
  key?: string;

  /** Describe if the key has only read access or read/write */
  read_only?: boolean;

  /** Title of the key to add */
  title?: string;
}

export interface CreateLabelOption {
  /**  */
  color?: string;

  /**  */
  description?: string;

  /**  */
  name?: string;
}

export interface CreateMilestoneOption {
  /**  */
  description?: string;

  /**  */
  due_on?: Date;

  /**  */
  state?: EnumCreateMilestoneOptionState;

  /**  */
  title?: string;
}

export interface CreateOAuth2ApplicationOptions {
  /**  */
  name?: string;

  /**  */
  redirect_uris?: string[];
}

export interface CreateOrgOption {
  /**  */
  description?: string;

  /**  */
  full_name?: string;

  /**  */
  location?: string;

  /**  */
  repo_admin_change_team_access?: boolean;

  /**  */
  username?: string;

  /** possible values are `public` (default), `limited` or `private` */
  visibility?: EnumCreateOrgOptionVisibility;

  /**  */
  website?: string;
}

export interface CreatePullRequestOption {
  /**  */
  assignee?: string;

  /**  */
  assignees?: string[];

  /**  */
  base?: string;

  /**  */
  body?: string;

  /**  */
  due_date?: Date;

  /**  */
  head?: string;

  /**  */
  labels?: number[];

  /**  */
  milestone?: number;

  /**  */
  title?: string;
}

export interface CreatePullReviewComment {
  /**  */
  body?: string;

  /** if comment to new file line or 0 */
  new_position?: number;

  /** if comment to old file line or 0 */
  old_position?: number;

  /** the tree path */
  path?: string;
}

export interface CreatePullReviewOptions {
  /**  */
  body?: string;

  /**  */
  comments?: CreatePullReviewComment[];

  /**  */
  commit_id?: string;

  /**  */
  event?: ReviewStateType;
}

export interface CreateReleaseOption {
  /**  */
  body?: string;

  /**  */
  draft?: boolean;

  /**  */
  name?: string;

  /**  */
  prerelease?: boolean;

  /**  */
  tag_name?: string;

  /**  */
  target_commitish?: string;
}

export interface CreateRepoOption {
  /** Whether the repository should be auto-initialized? */
  auto_init?: boolean;

  /** DefaultBranch of the repository (used when initializes and in template) */
  default_branch?: string;

  /** Description of the repository to create */
  description?: string;

  /** Gitignores to use */
  gitignores?: string;

  /** Label-Set to use */
  issue_labels?: string;

  /** License to use */
  license?: string;

  /** Name of the repository to create */
  name?: string;

  /** Whether the repository is private */
  private?: boolean;

  /** Readme of the repository to create */
  readme?: string;

  /** Whether the repository is template */
  template?: boolean;

  /** TrustModel of the repository */
  trust_model?: EnumCreateRepoOptionTrustModel;
}

export interface CreateStatusOption {
  /**  */
  context?: string;

  /**  */
  description?: string;

  /**  */
  state?: CommitStatusState;

  /**  */
  target_url?: string;
}

export interface CreateTagOption {
  /**  */
  message?: string;

  /**  */
  tag_name?: string;

  /**  */
  target?: string;
}

export interface CreateTeamOption {
  /**  */
  can_create_org_repo?: boolean;

  /**  */
  description?: string;

  /**  */
  includes_all_repositories?: boolean;

  /**  */
  name?: string;

  /**  */
  permission?: EnumCreateTeamOptionPermission;

  /**  */
  units?: string[];

  /**  */
  units_map?: object;
}

export interface CreateUserOption {
  /**  */
  email?: string;

  /**  */
  full_name?: string;

  /**  */
  login_name?: string;

  /**  */
  must_change_password?: boolean;

  /**  */
  password?: string;

  /**  */
  send_notify?: boolean;

  /**  */
  source_id?: number;

  /**  */
  username?: string;

  /**  */
  visibility?: string;
}

export interface CreateWikiPageOptions {
  /** content must be base64 encoded */
  content_base64?: string;

  /** optional commit message summarizing the change */
  message?: string;

  /** page title. leave empty to keep unchanged */
  title?: string;
}

export interface Cron {
  /**  */
  exec_times?: number;

  /**  */
  name?: string;

  /**  */
  next?: Date;

  /**  */
  prev?: Date;

  /**  */
  schedule?: string;
}

export interface DeleteEmailOption {
  /** email addresses to delete */
  emails?: string[];
}

export interface DeleteFileOptions {
  /**  */
  author?: Identity;

  /** branch (optional) to base this file from. if not given, the default branch is used */
  branch?: string;

  /**  */
  committer?: Identity;

  /**  */
  dates?: CommitDateOptions;

  /** message (optional) for the commit of this file. if not supplied, a default message will be used */
  message?: string;

  /** new_branch (optional) will make a new branch from `branch` before creating the file */
  new_branch?: string;

  /** sha is the SHA for the file that already exists */
  sha?: string;

  /** Add a Signed-off-by trailer by the committer at the end of the commit log message. */
  signoff?: boolean;
}

export interface DeployKey {
  /**  */
  created_at?: Date;

  /**  */
  fingerprint?: string;

  /**  */
  id?: number;

  /**  */
  key?: string;

  /**  */
  key_id?: number;

  /**  */
  read_only?: boolean;

  /**  */
  repository?: Repository;

  /**  */
  title?: string;

  /**  */
  url?: string;
}

export interface DismissPullReviewOptions {
  /**  */
  message?: string;
}

export interface EditAttachmentOptions {
  /**  */
  name?: string;
}

export interface EditBranchProtectionOption {
  /**  */
  approvals_whitelist_teams?: string[];

  /**  */
  approvals_whitelist_username?: string[];

  /**  */
  block_on_official_review_requests?: boolean;

  /**  */
  block_on_outdated_branch?: boolean;

  /**  */
  block_on_rejected_reviews?: boolean;

  /**  */
  dismiss_stale_approvals?: boolean;

  /**  */
  enable_approvals_whitelist?: boolean;

  /**  */
  enable_merge_whitelist?: boolean;

  /**  */
  enable_push?: boolean;

  /**  */
  enable_push_whitelist?: boolean;

  /**  */
  enable_status_check?: boolean;

  /**  */
  merge_whitelist_teams?: string[];

  /**  */
  merge_whitelist_usernames?: string[];

  /**  */
  protected_file_patterns?: string;

  /**  */
  push_whitelist_deploy_keys?: boolean;

  /**  */
  push_whitelist_teams?: string[];

  /**  */
  push_whitelist_usernames?: string[];

  /**  */
  require_signed_commits?: boolean;

  /**  */
  required_approvals?: number;

  /**  */
  status_check_contexts?: string[];

  /**  */
  unprotected_file_patterns?: string;
}

export interface EditDeadlineOption {
  /**  */
  due_date?: Date;
}

export interface EditGitHookOption {
  /**  */
  content?: string;
}

export interface EditHookOption {
  /**  */
  active?: boolean;

  /**  */
  branch_filter?: string;

  /**  */
  config?: object;

  /**  */
  events?: string[];
}

export interface EditIssueCommentOption {
  /**  */
  body?: string;
}

export interface EditIssueOption {
  /** deprecated */
  assignee?: string;

  /**  */
  assignees?: string[];

  /**  */
  body?: string;

  /**  */
  due_date?: Date;

  /**  */
  milestone?: number;

  /**  */
  ref?: string;

  /**  */
  state?: string;

  /**  */
  title?: string;

  /**  */
  unset_due_date?: boolean;
}

export interface EditLabelOption {
  /**  */
  color?: string;

  /**  */
  description?: string;

  /**  */
  name?: string;
}

export interface EditMilestoneOption {
  /**  */
  description?: string;

  /**  */
  due_on?: Date;

  /**  */
  state?: string;

  /**  */
  title?: string;
}

export interface EditOrgOption {
  /**  */
  description?: string;

  /**  */
  full_name?: string;

  /**  */
  location?: string;

  /**  */
  repo_admin_change_team_access?: boolean;

  /** possible values are `public`, `limited` or `private` */
  visibility?: EnumEditOrgOptionVisibility;

  /**  */
  website?: string;
}

export interface EditPullRequestOption {
  /**  */
  assignee?: string;

  /**  */
  assignees?: string[];

  /**  */
  base?: string;

  /**  */
  body?: string;

  /**  */
  due_date?: Date;

  /**  */
  labels?: number[];

  /**  */
  milestone?: number;

  /**  */
  state?: string;

  /**  */
  title?: string;

  /**  */
  unset_due_date?: boolean;
}

export interface EditReactionOption {
  /**  */
  content?: string;
}

export interface EditReleaseOption {
  /**  */
  body?: string;

  /**  */
  draft?: boolean;

  /**  */
  name?: string;

  /**  */
  prerelease?: boolean;

  /**  */
  tag_name?: string;

  /**  */
  target_commitish?: string;
}

export interface EditRepoOption {
  /** either `true` to allow mark pr as merged manually, or `false` to prevent it. `has_pull_requests` must be `true`. */
  allow_manual_merge?: boolean;

  /** either `true` to allow merging pull requests with a merge commit, or `false` to prevent merging pull requests with merge commits. `has_pull_requests` must be `true`. */
  allow_merge_commits?: boolean;

  /** either `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging. `has_pull_requests` must be `true`. */
  allow_rebase?: boolean;

  /** either `true` to allow rebase with explicit merge commits (--no-ff), or `false` to prevent rebase with explicit merge commits. `has_pull_requests` must be `true`. */
  allow_rebase_explicit?: boolean;

  /** either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging. `has_pull_requests` must be `true`. */
  allow_squash_merge?: boolean;

  /** set to `true` to archive this repository. */
  archived?: boolean;

  /** either `true` to enable AutodetectManualMerge, or `false` to prevent it. `has_pull_requests` must be `true`, Note: In some special cases, misjudgments can occur. */
  autodetect_manual_merge?: boolean;

  /** sets the default branch for this repository. */
  default_branch?: string;

  /** set to `true` to delete pr branch after merge by default */
  default_delete_branch_after_merge?: boolean;

  /** set to a merge style to be used by this repository: "merge", "rebase", "rebase-merge", or "squash". `has_pull_requests` must be `true`. */
  default_merge_style?: string;

  /** a short description of the repository. */
  description?: string;

  /**  */
  external_tracker?: ExternalTracker;

  /**  */
  external_wiki?: ExternalWiki;

  /** either `true` to enable issues for this repository or `false` to disable them. */
  has_issues?: boolean;

  /** either `true` to enable project unit, or `false` to disable them. */
  has_projects?: boolean;

  /** either `true` to allow pull requests, or `false` to prevent pull request. */
  has_pull_requests?: boolean;

  /** either `true` to enable the wiki for this repository or `false` to disable it. */
  has_wiki?: boolean;

  /** either `true` to ignore whitespace for conflicts, or `false` to not ignore whitespace. `has_pull_requests` must be `true`. */
  ignore_whitespace_conflicts?: boolean;

  /**  */
  internal_tracker?: InternalTracker;

  /** set to a string like `8h30m0s` to set the mirror interval time */
  mirror_interval?: string;

  /** name of the repository */
  name?: string;

  /** either `true` to make the repository private or `false` to make it public.
Note: you will get a 422 error if the organization restricts changing repository visibility to organization
owners and a non-owner tries to change the value of private. */
  private?: boolean;

  /** either `true` to make this repository a template or `false` to make it a normal repository */
  template?: boolean;

  /** a URL with more information about the repository. */
  website?: string;
}

export interface EditTeamOption {
  /**  */
  can_create_org_repo?: boolean;

  /**  */
  description?: string;

  /**  */
  includes_all_repositories?: boolean;

  /**  */
  name?: string;

  /**  */
  permission?: EnumEditTeamOptionPermission;

  /**  */
  units?: string[];

  /**  */
  units_map?: object;
}

export interface EditUserOption {
  /**  */
  active?: boolean;

  /**  */
  admin?: boolean;

  /**  */
  allow_create_organization?: boolean;

  /**  */
  allow_git_hook?: boolean;

  /**  */
  allow_import_local?: boolean;

  /**  */
  description?: string;

  /**  */
  email?: string;

  /**  */
  full_name?: string;

  /**  */
  location?: string;

  /**  */
  login_name?: string;

  /**  */
  max_repo_creation?: number;

  /**  */
  must_change_password?: boolean;

  /**  */
  password?: string;

  /**  */
  prohibit_login?: boolean;

  /**  */
  restricted?: boolean;

  /**  */
  source_id?: number;

  /**  */
  visibility?: string;

  /**  */
  website?: string;
}

export interface Email {
  /**  */
  email?: string;

  /**  */
  primary?: boolean;

  /**  */
  verified?: boolean;
}

export interface ExternalTracker {
  /** External Issue Tracker URL Format. Use the placeholders {user}, {repo} and {index} for the username, repository name and issue index. */
  external_tracker_format?: string;

  /** External Issue Tracker Number Format, either `numeric` or `alphanumeric` */
  external_tracker_style?: string;

  /** URL of external issue tracker. */
  external_tracker_url?: string;
}

export interface ExternalWiki {
  /** URL of external wiki. */
  external_wiki_url?: string;
}

export interface FileCommitResponse {
  /**  */
  author?: CommitUser;

  /**  */
  committer?: CommitUser;

  /**  */
  created?: Date;

  /**  */
  html_url?: string;

  /**  */
  message?: string;

  /**  */
  parents?: CommitMeta[];

  /**  */
  sha?: string;

  /**  */
  tree?: CommitMeta;

  /**  */
  url?: string;
}

export interface FileDeleteResponse {
  /**  */
  commit?: FileCommitResponse;

  /**  */
  content?: object;

  /**  */
  verification?: PayloadCommitVerification;
}

export interface FileLinksResponse {
  /**  */
  git?: string;

  /**  */
  html?: string;

  /**  */
  self?: string;
}

export interface FileResponse {
  /**  */
  commit?: FileCommitResponse;

  /**  */
  content?: ContentsResponse;

  /**  */
  verification?: PayloadCommitVerification;
}

export interface GPGKey {
  /**  */
  can_certify?: boolean;

  /**  */
  can_encrypt_comms?: boolean;

  /**  */
  can_encrypt_storage?: boolean;

  /**  */
  can_sign?: boolean;

  /**  */
  created_at?: Date;

  /**  */
  emails?: GPGKeyEmail[];

  /**  */
  expires_at?: Date;

  /**  */
  id?: number;

  /**  */
  key_id?: string;

  /**  */
  primary_key_id?: string;

  /**  */
  public_key?: string;

  /**  */
  subkeys?: GPGKey[];

  /**  */
  verified?: boolean;
}

export interface GPGKeyEmail {
  /**  */
  email?: string;

  /**  */
  verified?: boolean;
}

export interface GeneralAPISettings {
  /**  */
  default_git_trees_per_page?: number;

  /**  */
  default_max_blob_size?: number;

  /**  */
  default_paging_num?: number;

  /**  */
  max_response_items?: number;
}

export interface GeneralAttachmentSettings {
  /**  */
  allowed_types?: string;

  /**  */
  enabled?: boolean;

  /**  */
  max_files?: number;

  /**  */
  max_size?: number;
}

export interface GeneralRepoSettings {
  /**  */
  http_git_disabled?: boolean;

  /**  */
  lfs_disabled?: boolean;

  /**  */
  migrations_disabled?: boolean;

  /**  */
  mirrors_disabled?: boolean;

  /**  */
  stars_disabled?: boolean;

  /**  */
  time_tracking_disabled?: boolean;
}

export interface GeneralUISettings {
  /**  */
  allowed_reactions?: string[];

  /**  */
  custom_emojis?: string[];

  /**  */
  default_theme?: string;
}

export interface GenerateRepoOption {
  /** include avatar of the template repo */
  avatar?: boolean;

  /** Description of the repository to create */
  description?: string;

  /** include git content of default branch in template repo */
  git_content?: boolean;

  /** include git hooks in template repo */
  git_hooks?: boolean;

  /** include labels in template repo */
  labels?: boolean;

  /** Name of the repository to create */
  name?: string;

  /** The organization or person who will own the new repository */
  owner?: string;

  /** Whether the repository is private */
  private?: boolean;

  /** include topics in template repo */
  topics?: boolean;

  /** include webhooks in template repo */
  webhooks?: boolean;
}

export interface GitBlobResponse {
  /**  */
  content?: string;

  /**  */
  encoding?: string;

  /**  */
  sha?: string;

  /**  */
  size?: number;

  /**  */
  url?: string;
}

export interface GitEntry {
  /**  */
  mode?: string;

  /**  */
  path?: string;

  /**  */
  sha?: string;

  /**  */
  size?: number;

  /**  */
  type?: string;

  /**  */
  url?: string;
}

export interface GitHook {
  /**  */
  content?: string;

  /**  */
  is_active?: boolean;

  /**  */
  name?: string;
}

export interface GitObject {
  /**  */
  sha?: string;

  /**  */
  type?: string;

  /**  */
  url?: string;
}

export interface GitServiceType {}

export interface GitTreeResponse {
  /**  */
  page?: number;

  /**  */
  sha?: string;

  /**  */
  total_count?: number;

  /**  */
  tree?: GitEntry[];

  /**  */
  truncated?: boolean;

  /**  */
  url?: string;
}

export interface Hook {
  /**  */
  active?: boolean;

  /**  */
  config?: object;

  /**  */
  created_at?: Date;

  /**  */
  events?: string[];

  /**  */
  id?: number;

  /**  */
  type?: string;

  /**  */
  updated_at?: Date;
}

export interface Identity {
  /**  */
  email?: string;

  /**  */
  name?: string;
}

export interface InternalTracker {
  /** Let only contributors track time (Built-in issue tracker) */
  allow_only_contributors_to_track_time?: boolean;

  /** Enable dependencies for issues and pull requests (Built-in issue tracker) */
  enable_issue_dependencies?: boolean;

  /** Enable time tracking (Built-in issue tracker) */
  enable_time_tracker?: boolean;
}

export interface Issue {
  /**  */
  assignee?: User;

  /**  */
  assignees?: User[];

  /**  */
  body?: string;

  /**  */
  closed_at?: Date;

  /**  */
  comments?: number;

  /**  */
  created_at?: Date;

  /**  */
  due_date?: Date;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  is_locked?: boolean;

  /**  */
  labels?: Label[];

  /**  */
  milestone?: Milestone;

  /**  */
  number?: number;

  /**  */
  original_author?: string;

  /**  */
  original_author_id?: number;

  /**  */
  pull_request?: PullRequestMeta;

  /**  */
  ref?: string;

  /**  */
  repository?: RepositoryMeta;

  /**  */
  state?: StateType;

  /**  */
  title?: string;

  /**  */
  updated_at?: Date;

  /**  */
  url?: string;

  /**  */
  user?: User;
}

export interface IssueDeadline {
  /**  */
  due_date?: Date;
}

export interface IssueLabelsOption {
  /** list of label IDs */
  labels?: number[];
}

export interface IssueTemplate {
  /**  */
  about?: string;

  /**  */
  content?: string;

  /**  */
  file_name?: string;

  /**  */
  labels?: string[];

  /**  */
  name?: string;

  /**  */
  ref?: string;

  /**  */
  title?: string;
}

export interface Label {
  /**  */
  color?: string;

  /**  */
  description?: string;

  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  url?: string;
}

export interface MarkdownOption {
  /** Context to render

in: body */
  Context?: string;

  /** Mode to render

in: body */
  Mode?: string;

  /** Text markdown to render

in: body */
  Text?: string;

  /** Is it a wiki page ?

in: body */
  Wiki?: boolean;
}

export interface MergePullRequestOption {
  /**  */
  Do?: EnumMergePullRequestOptionDo;

  /**  */
  MergeCommitID?: string;

  /**  */
  MergeMessageField?: string;

  /**  */
  MergeTitleField?: string;

  /**  */
  delete_branch_after_merge?: boolean;

  /**  */
  force_merge?: boolean;

  /**  */
  head_commit_id?: string;
}

export interface MigrateRepoForm {
  /**  */
  auth_password?: string;

  /**  */
  auth_token?: string;

  /**  */
  auth_username?: string;

  /**  */
  clone_addr?: string;

  /**  */
  description?: string;

  /**  */
  issues?: boolean;

  /**  */
  labels?: boolean;

  /**  */
  lfs?: boolean;

  /**  */
  lfs_endpoint?: string;

  /**  */
  milestones?: boolean;

  /**  */
  mirror?: boolean;

  /**  */
  mirror_interval?: string;

  /**  */
  private?: boolean;

  /**  */
  pull_requests?: boolean;

  /**  */
  releases?: boolean;

  /**  */
  repo_name?: string;

  /**  */
  service?: GitServiceType;

  /**  */
  uid?: number;

  /**  */
  wiki?: boolean;
}

export interface MigrateRepoOptions {
  /**  */
  auth_password?: string;

  /**  */
  auth_token?: string;

  /**  */
  auth_username?: string;

  /**  */
  clone_addr?: string;

  /**  */
  description?: string;

  /**  */
  issues?: boolean;

  /**  */
  labels?: boolean;

  /**  */
  lfs?: boolean;

  /**  */
  lfs_endpoint?: string;

  /**  */
  milestones?: boolean;

  /**  */
  mirror?: boolean;

  /**  */
  mirror_interval?: string;

  /**  */
  private?: boolean;

  /**  */
  pull_requests?: boolean;

  /**  */
  releases?: boolean;

  /**  */
  repo_name?: string;

  /** Name of User or Organisation who will own Repo after migration */
  repo_owner?: string;

  /**  */
  service?: EnumMigrateRepoOptionsService;

  /** deprecated (only for backwards compatibility) */
  uid?: number;

  /**  */
  wiki?: boolean;
}

export interface Milestone {
  /**  */
  closed_at?: Date;

  /**  */
  closed_issues?: number;

  /**  */
  created_at?: Date;

  /**  */
  description?: string;

  /**  */
  due_on?: Date;

  /**  */
  id?: number;

  /**  */
  open_issues?: number;

  /**  */
  state?: StateType;

  /**  */
  title?: string;

  /**  */
  updated_at?: Date;
}

export interface NodeInfo {
  /**  */
  metadata?: object;

  /**  */
  openRegistrations?: boolean;

  /**  */
  protocols?: string[];

  /**  */
  services?: NodeInfoServices;

  /**  */
  software?: NodeInfoSoftware;

  /**  */
  usage?: NodeInfoUsage;

  /**  */
  version?: string;
}

export interface NodeInfoServices {
  /**  */
  inbound?: string[];

  /**  */
  outbound?: string[];
}

export interface NodeInfoSoftware {
  /**  */
  homepage?: string;

  /**  */
  name?: string;

  /**  */
  repository?: string;

  /**  */
  version?: string;
}

export interface NodeInfoUsage {
  /**  */
  localComments?: number;

  /**  */
  localPosts?: number;

  /**  */
  users?: NodeInfoUsageUsers;
}

export interface NodeInfoUsageUsers {
  /**  */
  activeHalfyear?: number;

  /**  */
  activeMonth?: number;

  /**  */
  total?: number;
}

export interface Note {
  /**  */
  commit?: Commit;

  /**  */
  message?: string;
}

export interface NotificationCount {
  /**  */
  new?: number;
}

export interface NotificationSubject {
  /**  */
  html_url?: string;

  /**  */
  latest_comment_html_url?: string;

  /**  */
  latest_comment_url?: string;

  /**  */
  state?: StateType;

  /**  */
  title?: string;

  /**  */
  type?: NotifySubjectType;

  /**  */
  url?: string;
}

export interface NotificationThread {
  /**  */
  id?: number;

  /**  */
  pinned?: boolean;

  /**  */
  repository?: Repository;

  /**  */
  subject?: NotificationSubject;

  /**  */
  unread?: boolean;

  /**  */
  updated_at?: Date;

  /**  */
  url?: string;
}

export interface NotifySubjectType {}

export interface OAuth2Application {
  /**  */
  client_id?: string;

  /**  */
  client_secret?: string;

  /**  */
  created?: Date;

  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  redirect_uris?: string[];
}

export interface Organization {
  /**  */
  avatar_url?: string;

  /**  */
  description?: string;

  /**  */
  full_name?: string;

  /**  */
  id?: number;

  /**  */
  location?: string;

  /**  */
  repo_admin_change_team_access?: boolean;

  /**  */
  username?: string;

  /**  */
  visibility?: string;

  /**  */
  website?: string;
}

export interface OrganizationPermissions {
  /**  */
  can_create_repository?: boolean;

  /**  */
  can_read?: boolean;

  /**  */
  can_write?: boolean;

  /**  */
  is_admin?: boolean;

  /**  */
  is_owner?: boolean;
}

export interface PRBranchInfo {
  /**  */
  label?: string;

  /**  */
  ref?: string;

  /**  */
  repo?: Repository;

  /**  */
  repo_id?: number;

  /**  */
  sha?: string;
}

export interface PayloadCommit {
  /**  */
  added?: string[];

  /**  */
  author?: PayloadUser;

  /**  */
  committer?: PayloadUser;

  /** sha1 hash of the commit */
  id?: string;

  /**  */
  message?: string;

  /**  */
  modified?: string[];

  /**  */
  removed?: string[];

  /**  */
  timestamp?: Date;

  /**  */
  url?: string;

  /**  */
  verification?: PayloadCommitVerification;
}

export interface PayloadCommitVerification {
  /**  */
  payload?: string;

  /**  */
  reason?: string;

  /**  */
  signature?: string;

  /**  */
  signer?: PayloadUser;

  /**  */
  verified?: boolean;
}

export interface PayloadUser {
  /**  */
  email?: string;

  /** Full name of the commit author */
  name?: string;

  /**  */
  username?: string;
}

export interface Permission {
  /**  */
  admin?: boolean;

  /**  */
  pull?: boolean;

  /**  */
  push?: boolean;
}

export interface PublicKey {
  /**  */
  created_at?: Date;

  /**  */
  fingerprint?: string;

  /**  */
  id?: number;

  /**  */
  key?: string;

  /**  */
  key_type?: string;

  /**  */
  read_only?: boolean;

  /**  */
  title?: string;

  /**  */
  url?: string;

  /**  */
  user?: User;
}

export interface PullRequest {
  /**  */
  assignee?: User;

  /**  */
  assignees?: User[];

  /**  */
  base?: PRBranchInfo;

  /**  */
  body?: string;

  /**  */
  closed_at?: Date;

  /**  */
  comments?: number;

  /**  */
  created_at?: Date;

  /**  */
  diff_url?: string;

  /**  */
  due_date?: Date;

  /**  */
  head?: PRBranchInfo;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  is_locked?: boolean;

  /**  */
  labels?: Label[];

  /**  */
  merge_base?: string;

  /**  */
  merge_commit_sha?: string;

  /**  */
  mergeable?: boolean;

  /**  */
  merged?: boolean;

  /**  */
  merged_at?: Date;

  /**  */
  merged_by?: User;

  /**  */
  milestone?: Milestone;

  /**  */
  number?: number;

  /**  */
  patch_url?: string;

  /**  */
  state?: StateType;

  /**  */
  title?: string;

  /**  */
  updated_at?: Date;

  /**  */
  url?: string;

  /**  */
  user?: User;
}

export interface PullRequestMeta {
  /**  */
  merged?: boolean;

  /**  */
  merged_at?: Date;
}

export interface PullReview {
  /**  */
  body?: string;

  /**  */
  comments_count?: number;

  /**  */
  commit_id?: string;

  /**  */
  dismissed?: boolean;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  official?: boolean;

  /**  */
  pull_request_url?: string;

  /**  */
  stale?: boolean;

  /**  */
  state?: ReviewStateType;

  /**  */
  submitted_at?: Date;

  /**  */
  team?: Team;

  /**  */
  user?: User;
}

export interface PullReviewComment {
  /**  */
  body?: string;

  /**  */
  commit_id?: string;

  /**  */
  created_at?: Date;

  /**  */
  diff_hunk?: string;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  original_commit_id?: string;

  /**  */
  original_position?: number;

  /**  */
  path?: string;

  /**  */
  position?: number;

  /**  */
  pull_request_review_id?: number;

  /**  */
  pull_request_url?: string;

  /**  */
  resolver?: User;

  /**  */
  updated_at?: Date;

  /**  */
  user?: User;
}

export interface PullReviewRequestOptions {
  /**  */
  reviewers?: string[];

  /**  */
  team_reviewers?: string[];
}

export interface Reaction {
  /**  */
  content?: string;

  /**  */
  created_at?: Date;

  /**  */
  user?: User;
}

export interface Reference {
  /**  */
  object?: GitObject;

  /**  */
  ref?: string;

  /**  */
  url?: string;
}

export interface Release {
  /**  */
  assets?: Attachment[];

  /**  */
  author?: User;

  /**  */
  body?: string;

  /**  */
  created_at?: Date;

  /**  */
  draft?: boolean;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  prerelease?: boolean;

  /**  */
  published_at?: Date;

  /**  */
  tag_name?: string;

  /**  */
  tarball_url?: string;

  /**  */
  target_commitish?: string;

  /**  */
  url?: string;

  /**  */
  zipball_url?: string;
}

export interface RepoCommit {
  /**  */
  author?: CommitUser;

  /**  */
  committer?: CommitUser;

  /**  */
  message?: string;

  /**  */
  tree?: CommitMeta;

  /**  */
  url?: string;
}

export interface RepoTopicOptions {
  /** list of topic names */
  topics?: string[];
}

export interface RepoTransfer {
  /**  */
  doer?: User;

  /**  */
  recipient?: User;

  /**  */
  teams?: Team[];
}

export interface Repository {
  /**  */
  allow_merge_commits?: boolean;

  /**  */
  allow_rebase?: boolean;

  /**  */
  allow_rebase_explicit?: boolean;

  /**  */
  allow_squash_merge?: boolean;

  /**  */
  archived?: boolean;

  /**  */
  avatar_url?: string;

  /**  */
  clone_url?: string;

  /**  */
  created_at?: Date;

  /**  */
  default_branch?: string;

  /**  */
  default_merge_style?: string;

  /**  */
  description?: string;

  /**  */
  empty?: boolean;

  /**  */
  external_tracker?: ExternalTracker;

  /**  */
  external_wiki?: ExternalWiki;

  /**  */
  fork?: boolean;

  /**  */
  forks_count?: number;

  /**  */
  full_name?: string;

  /**  */
  has_issues?: boolean;

  /**  */
  has_projects?: boolean;

  /**  */
  has_pull_requests?: boolean;

  /**  */
  has_wiki?: boolean;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  ignore_whitespace_conflicts?: boolean;

  /**  */
  internal?: boolean;

  /**  */
  internal_tracker?: InternalTracker;

  /**  */
  mirror?: boolean;

  /**  */
  mirror_interval?: string;

  /**  */
  mirror_updated?: Date;

  /**  */
  name?: string;

  /**  */
  open_issues_count?: number;

  /**  */
  open_pr_counter?: number;

  /**  */
  original_url?: string;

  /**  */
  owner?: User;

  /**  */
  parent?: Repository;

  /**  */
  permissions?: Permission;

  /**  */
  private?: boolean;

  /**  */
  release_counter?: number;

  /**  */
  repo_transfer?: RepoTransfer;

  /**  */
  size?: number;

  /**  */
  ssh_url?: string;

  /**  */
  stars_count?: number;

  /**  */
  template?: boolean;

  /**  */
  updated_at?: Date;

  /**  */
  watchers_count?: number;

  /**  */
  website?: string;
}

export interface RepositoryMeta {
  /**  */
  full_name?: string;

  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  owner?: string;
}

export interface ReviewStateType {}

export interface SearchResults {
  /**  */
  data?: Repository[];

  /**  */
  ok?: boolean;
}

export interface ServerVersion {
  /**  */
  version?: string;
}

export interface StateType {}

export interface StopWatch {
  /**  */
  created?: Date;

  /**  */
  duration?: string;

  /**  */
  issue_index?: number;

  /**  */
  issue_title?: string;

  /**  */
  repo_name?: string;

  /**  */
  repo_owner_name?: string;

  /**  */
  seconds?: number;
}

export interface SubmitPullReviewOptions {
  /**  */
  body?: string;

  /**  */
  event?: ReviewStateType;
}

export interface Tag {
  /**  */
  commit?: CommitMeta;

  /**  */
  id?: string;

  /**  */
  message?: string;

  /**  */
  name?: string;

  /**  */
  tarball_url?: string;

  /**  */
  zipball_url?: string;
}

export interface Team {
  /**  */
  can_create_org_repo?: boolean;

  /**  */
  description?: string;

  /**  */
  id?: number;

  /**  */
  includes_all_repositories?: boolean;

  /**  */
  name?: string;

  /**  */
  organization?: Organization;

  /**  */
  permission?: EnumTeamPermission;

  /**  */
  units?: string[];

  /**  */
  units_map?: object;
}

export interface TimeStamp {}

export interface TimelineComment {
  /**  */
  assignee?: User;

  /**  */
  assignee_team?: Team;

  /**  */
  body?: string;

  /**  */
  created_at?: Date;

  /**  */
  dependent_issue?: Issue;

  /**  */
  html_url?: string;

  /**  */
  id?: number;

  /**  */
  issue_url?: string;

  /**  */
  label?: Label;

  /**  */
  milestone?: Milestone;

  /**  */
  new_ref?: string;

  /**  */
  new_title?: string;

  /**  */
  old_milestone?: Milestone;

  /**  */
  old_project_id?: number;

  /**  */
  old_ref?: string;

  /**  */
  old_title?: string;

  /**  */
  project_id?: number;

  /**  */
  pull_request_url?: string;

  /**  */
  ref_action?: string;

  /**  */
  ref_comment?: Comment;

  /** commit SHA where issue/PR was referenced */
  ref_commit_sha?: string;

  /**  */
  ref_issue?: Issue;

  /** whether the assignees were removed or added */
  removed_assignee?: boolean;

  /**  */
  resolve_doer?: User;

  /**  */
  review_id?: number;

  /**  */
  tracked_time?: TrackedTime;

  /**  */
  type?: string;

  /**  */
  updated_at?: Date;

  /**  */
  user?: User;
}

export interface TopicName {
  /**  */
  topics?: string[];
}

export interface TopicResponse {
  /**  */
  created?: Date;

  /**  */
  id?: number;

  /**  */
  repo_count?: number;

  /**  */
  topic_name?: string;

  /**  */
  updated?: Date;
}

export interface TrackedTime {
  /**  */
  created?: Date;

  /**  */
  id?: number;

  /**  */
  issue?: Issue;

  /** deprecated (only for backwards compatibility) */
  issue_id?: number;

  /** Time in seconds */
  time?: number;

  /** deprecated (only for backwards compatibility) */
  user_id?: number;

  /**  */
  user_name?: string;
}

export interface TransferRepoOption {
  /**  */
  new_owner?: string;

  /** ID of the team or teams to add to the repository. Teams can only be added to organization-owned repositories. */
  team_ids?: number[];
}

export interface UpdateFileOptions {
  /**  */
  author?: Identity;

  /** branch (optional) to base this file from. if not given, the default branch is used */
  branch?: string;

  /**  */
  committer?: Identity;

  /** content must be base64 encoded */
  content?: string;

  /**  */
  dates?: CommitDateOptions;

  /** from_path (optional) is the path of the original file which will be moved/renamed to the path in the URL */
  from_path?: string;

  /** message (optional) for the commit of this file. if not supplied, a default message will be used */
  message?: string;

  /** new_branch (optional) will make a new branch from `branch` before creating the file */
  new_branch?: string;

  /** sha is the SHA for the file that already exists */
  sha?: string;

  /** Add a Signed-off-by trailer by the committer at the end of the commit log message. */
  signoff?: boolean;
}

export interface User {
  /** Is user active */
  active?: boolean;

  /** URL to the user's avatar */
  avatar_url?: string;

  /**  */
  created?: Date;

  /** the user's description */
  description?: string;

  /**  */
  email?: string;

  /** user counts */
  followers_count?: number;

  /**  */
  following_count?: number;

  /** the user's full name */
  full_name?: string;

  /** the user's id */
  id?: number;

  /** Is the user an administrator */
  is_admin?: boolean;

  /** User locale */
  language?: string;

  /**  */
  last_login?: Date;

  /** the user's location */
  location?: string;

  /** the user's username */
  login?: string;

  /** Is user login prohibited */
  prohibit_login?: boolean;

  /** Is user restricted */
  restricted?: boolean;

  /**  */
  starred_repos_count?: number;

  /** User visibility level option: public, limited, private */
  visibility?: string;

  /** the user's website */
  website?: string;
}

export interface UserHeatmapData {
  /**  */
  contributions?: number;

  /**  */
  timestamp?: TimeStamp;
}

export interface UserSettings {
  /**  */
  description?: string;

  /**  */
  diff_view_style?: string;

  /**  */
  full_name?: string;

  /**  */
  hide_activity?: boolean;

  /** Privacy */
  hide_email?: boolean;

  /**  */
  language?: string;

  /**  */
  location?: string;

  /**  */
  theme?: string;

  /**  */
  website?: string;
}

export interface UserSettingsOptions {
  /**  */
  description?: string;

  /**  */
  diff_view_style?: string;

  /**  */
  full_name?: string;

  /**  */
  hide_activity?: boolean;

  /** Privacy */
  hide_email?: boolean;

  /**  */
  language?: string;

  /**  */
  location?: string;

  /**  */
  theme?: string;

  /**  */
  website?: string;
}

export interface WatchInfo {
  /**  */
  created_at?: Date;

  /**  */
  ignored?: boolean;

  /**  */
  reason?: object;

  /**  */
  repository_url?: string;

  /**  */
  subscribed?: boolean;

  /**  */
  url?: string;
}

export interface WikiCommit {
  /**  */
  author?: CommitUser;

  /**  */
  commiter?: CommitUser;

  /**  */
  message?: string;

  /**  */
  sha?: string;
}

export interface WikiCommitList {
  /**  */
  commits?: WikiCommit[];

  /**  */
  count?: number;
}

export interface WikiPage {
  /**  */
  commit_count?: number;

  /** Page content, base64 encoded */
  content_base64?: string;

  /**  */
  footer?: string;

  /**  */
  html_url?: string;

  /**  */
  last_commit?: WikiCommit;

  /**  */
  sidebar?: string;

  /**  */
  sub_url?: string;

  /**  */
  title?: string;
}

export interface WikiPageMetaData {
  /**  */
  html_url?: string;

  /**  */
  last_commit?: WikiCommit;

  /**  */
  sub_url?: string;

  /**  */
  title?: string;
}
export enum EnumCreateHookOptionType {
  'dingtalk' = 'dingtalk',
  'discord' = 'discord',
  'gitea' = 'gitea',
  'gogs' = 'gogs',
  'msteams' = 'msteams',
  'slack' = 'slack',
  'telegram' = 'telegram',
  'feishu' = 'feishu',
  'wechatwork' = 'wechatwork'
}
export enum EnumCreateMilestoneOptionState {
  'open' = 'open',
  'closed' = 'closed'
}
export enum EnumCreateOrgOptionVisibility {
  'public' = 'public',
  'limited' = 'limited',
  'private' = 'private'
}
export enum EnumCreateRepoOptionTrustModel {
  'default' = 'default',
  'collaborator' = 'collaborator',
  'committer' = 'committer',
  'collaboratorcommitter' = 'collaboratorcommitter'
}
export enum EnumCreateTeamOptionPermission {
  'read' = 'read',
  'write' = 'write',
  'admin' = 'admin'
}
export enum EnumEditOrgOptionVisibility {
  'public' = 'public',
  'limited' = 'limited',
  'private' = 'private'
}
export enum EnumEditTeamOptionPermission {
  'read' = 'read',
  'write' = 'write',
  'admin' = 'admin'
}
export enum EnumMergePullRequestOptionDo {
  'merge' = 'merge',
  'rebase' = 'rebase',
  'rebase-merge' = 'rebase-merge',
  'squash' = 'squash',
  'manually-merged' = 'manually-merged'
}
export enum EnumMigrateRepoOptionsService {
  'git' = 'git',
  'github' = 'github',
  'gitea' = 'gitea',
  'gitlab' = 'gitlab'
}
export enum EnumTeamPermission {
  'none' = 'none',
  'read' = 'read',
  'write' = 'write',
  'admin' = 'admin',
  'owner' = 'owner'
}
