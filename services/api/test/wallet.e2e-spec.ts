import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Wallet (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    prisma = new PrismaClient();

    await app.init();
  });

  beforeEach(async () => {
    // Arrange: Clean up the database
    await prisma.walletCredential.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /wallet/credentials', () => {
    it('should return a list of credentials', async () => {
      // Arrange: Create some credentials
      await prisma.walletCredential.createMany({
        data: [
          {
            raw: {
              name: 'John Doe',
              email: 'john.doe@example.com',
            },
          },
          {
            raw: {
              name: 'Jane Doe',
              email: 'jane.doe@example.com',
            },
          },
        ],
      });

      // Act: Get the credentials
      await request(app.getHttpServer())
        .get('/wallet/credentials')
        .then((response) => {
          // Assert: The response should be successful
          expect(response.status).toBe(200);

          // Assert: The response should have the correct number of credentials
          expect(response.body.credentials.length).toBe(2);
        });
    });
  });

  describe('POST /wallet/credentials', () => {
    it('should create a new credential', async () => {
      // Arrange: Prepare credential data
      const credentialData = {
        raw: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      };

      // Act & Assert: Create the credential
      const response = await request(app.getHttpServer())
        .post('/wallet/credentials')
        .send(credentialData)
        .expect(201);

      // Assert: Response should contain the created credential
      expect(response.body).toMatchObject({
        raw: credentialData.raw,
      });

      // Assert: Credential should be in the database
      const savedCredential = await prisma.walletCredential.findFirst({
        where: {
          raw: {
            path: ['name'],
            equals: credentialData.raw.name,
          },
        },
      });
      expect(savedCredential).toBeTruthy();
    });

    it('should return 400 for invalid credential data', async () => {
      // Act & Assert: Try to create with invalid data
      await request(app.getHttpServer())
        .post('/wallet/credentials')
        .send({})
        .expect(400);
    });
  });

  describe('DELETE /wallet/credentials/:id', () => {
    it('should delete an existing credential', async () => {
      // Arrange: Create a credential to delete
      const credential = await prisma.walletCredential.create({
        data: {
          raw: {
            name: 'To Delete',
            email: 'delete.me@example.com',
          },
        },
      });

      // Act & Assert: Delete the credential
      await request(app.getHttpServer())
        .delete(`/wallet/credentials/${credential.id}`)
        .expect(200);

      // Assert: Credential should not exist in database
      const deletedCredential = await prisma.walletCredential.findUnique({
        where: { id: credential.id },
      });
      expect(deletedCredential).toBeNull();
    });

    it('should return 404 for non-existent credential', async () => {
      // Act & Assert: Try to delete non-existent credential
      await request(app.getHttpServer())
        .delete('/wallet/credentials/non-existent-id')
        .expect(404);
    });
  });
});
