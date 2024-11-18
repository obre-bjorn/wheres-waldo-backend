const { createSession } = require('../../src/utils/prismaClient');

jest.mock('../../src/utils/prismaClient'); // Mock Prisma calls

test('createSession generates a valid session ID', async () => {
    const mockSessionId = '12345-abcde';
    createSession.mockResolvedValue({ id: mockSessionId });

    const session = await createSession();
    expect(session.id).toBe(mockSessionId);
    expect(createSession).toHaveBeenCalled();
});