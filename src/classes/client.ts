import axios, { type AxiosInstance } from 'axios';
import type { AuthDetails } from '../types/interfaces';
import AccountManager from './AccountManager';
import BackupManager from './BackupManager';
import ErrorManager from './ErrorManager';
import FileManager from './FileManager';
import ServerManager from './ServerManager';

/**
 * The PteroClient class is the main class of the API wrapper.
 * @public @class PteroClients
 * });
 */
export default class PteroClient {
  /**
   * The `FileManager` class, used to manage files on the server.
   * Can be accessed using `client.files`.
   */
  public files: FileManager;

  /**
   * The `BackupManager` class, used to manage backups on the server.
   * Can be accessed using `client.backups`.
   */
  public backups: BackupManager;

  /**
   * The `ServerManager` class, used to manage servers.
   * Can be accessed using `client.servers`.
   */
  public servers: ServerManager;

  /**
   * The `AccountManager` class, used to manage the account.
   * Can be accessed using `client.account`.
   */
  public account: AccountManager;

  /**
   * The `ErrorManager` class, used to manage errors.
   * Can be accessed using `client.errors`.
   */
  public errors: ErrorManager;

  /**
   * The `HTTP client` used to make requests to the API.
   * As it is `private`, it is not accessible to the user if they are using TypeScript.
   * In JavaScript, it is accessible, but it is **not** recommended to use it.
   */
  private _http: AxiosInstance;

  public constructor(private authDetails: AuthDetails) {
    this.authDetails = authDetails;

    if (!this.authDetails.baseURL.trim() || !this.authDetails.apiKey.trim()) {
      throw new Error('Missing/invalid base URL and/or API key!');
    }

    this._http = axios.create({
      baseURL: this.authDetails.baseURL,
      headers: {
        Authorization: `Bearer ${this.authDetails.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.files = new FileManager(this._http);
    this.backups = new BackupManager(this._http);
    this.servers = new ServerManager(this._http);
    this.account = new AccountManager(this._http);
    this.errors = new ErrorManager();
  }
}