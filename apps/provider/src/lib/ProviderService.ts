import type {
  Appointment,
  ProviderInput,
  ProviderKeyPairs,
  UnpublishedPublicAppointment,
  Vaccine,
  VanellusConfig,
} from "vanellus";
import { AuthError, ProviderApi } from "vanellus";

export class ProviderService {
  protected providerApi: ProviderApi;
  protected keyPairs?: ProviderKeyPairs;
  protected secret?: string;

  public constructor(readonly config: VanellusConfig) {
    this.providerApi = new ProviderApi(config);
  }

  public async authenticate(secret: string, keyPairs: ProviderKeyPairs) {
    this.secret = secret;
    this.keyPairs = keyPairs;

    await this.checkProvider();

    const backupData = await this.providerApi.restoreFromBackup(secret);

    return true;
  }

  public isAuthenticated() {
    return !!this.keyPairs && !!this.secret;
  }

  public logout() {
    this.secret = undefined;
    this.keyPairs = undefined;

    return true;
  }

  public async register(providerInput: ProviderInput, signupCode?: string) {
    this.keyPairs = await this.providerApi.generateKeyPairs();
    this.secret = this.providerApi.generateSecret();

    const provider = await this.providerApi.storeProvider(
      providerInput,
      this.getKeyPairs(),
      signupCode
    );

    return provider;
  }

  public async createAppointment(
    startDate: Date,
    duration: number,
    vaccine: Vaccine,
    slotCount: number
  ) {
    const { verifiedProvider } = await this.checkProvider();

    if (!verifiedProvider) {
      throw new AuthError("");
    }

    return this.providerApi.createAppointment(
      startDate,
      duration,
      vaccine,
      slotCount,
      verifiedProvider,
      this.getKeyPairs()
    );
  }

  public async createAppointmentSeries(
    startAt: Date,
    endAt: Date,
    interval: number,
    vaccine: Vaccine,
    lanes: number
  ) {
    const { verifiedProvider } = await this.checkProvider();

    if (!verifiedProvider) {
      throw new AuthError("");
    }

    return this.providerApi.createAppointmentSeries(
      startAt,
      endAt,
      interval,
      lanes,
      vaccine,
      verifiedProvider,
      this.getKeyPairs()
    );
  }

  public async getProviderAppointments(from: Date, to: Date) {
    return this.providerApi.getProviderAppointments(
      from,
      to,
      this.getKeyPairs()
    );
  }

  public async publishAppointments(
    unpublishedAppointments: UnpublishedPublicAppointment[]
  ) {
    return this.providerApi.publishAppointments(
      unpublishedAppointments,
      this.getKeyPairs()
    );
  }

  public async cancelAppointment(appointment: Appointment) {
    return this.providerApi.cancelAppointment(appointment, this.getKeyPairs());
  }

  public async storeProvider(providerInput: ProviderInput, code?: string) {
    return this.providerApi.storeProvider(
      providerInput,
      this.getKeyPairs(),
      code
    );
  }

  protected checkProvider() {
    return this.providerApi.checkProvider(this.getKeyPairs(), true);
  }

  protected getKeyPairs() {
    if (!this.keyPairs) {
      throw new AuthError();
    }

    return this.keyPairs;
  }
}