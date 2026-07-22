export class IntegrationService {
  async findAll(_userId: string) { return []; }
  async findById(_id: string) { return null; }
  async connect(_data: unknown, _userId: string) { return null; }
  async disconnect(_id: string) { return null; }
}

export const integrationService = new IntegrationService();
