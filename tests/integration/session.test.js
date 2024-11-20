const {app} = require('../../src/app')
const request = require('supertest')
const {getImageById,updateSession} = require('../../src/utils/prismaClient')
const {checkCharacterPos} = require('../../src/utils/helpers')



jest.mock('../../src/utils/prismaClient');
jest.mock('../../src/utils/helpers');

describe('POST /validate-click', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return success when the character is found', async () => {
        const mockImage = {
            characters: [{ name: 'character1', pos: { x: 50, y: 50 } }],
        };
        const mockSession = { id: 'session123', selections: 2 };

        getImageById.mockResolvedValue(mockImage);
        checkCharacterPos.mockReturnValue(['character1', true]);
        updateSession.mockResolvedValue(mockSession);

        const res = await request(app)
            .post('/validate-click')
            .send({
                imageId: 'image123',
                xPercentage: 48,
                yPercentage: 47,
                sessionID: 'session123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe('character1 found!');
        expect(res.body.gameover).toBe(false);
        expect(getImageById).toHaveBeenCalledWith('image123');
        // expect(checkCharacterPos).toHaveBeenCalledWith(mockImage.characters, 48, 47);
        expect(updateSession).toHaveBeenCalledWith('session123', 'character1', null);
    });

    test('should handle game over when selections reach 3', async () => {
        const mockImage = {
            characters: [{ name: 'character1', pos: { x: 50, y: 50 } }],
        };
        const mockSessionBeforeGameOver = {
                                            id: 'session123',
                                            selections: ['char1','char2','char3'],
                                            };

        const mockSessionAfterGameOver = {
                                            id: 'session123',
                                            selections: ['char1','char2','char3'],
                                            endtime: new Date(),
                                        };

        getImageById.mockResolvedValue(mockImage);
        checkCharacterPos.mockReturnValue(['character1', true]);
        updateSession.mockResolvedValueOnce(mockSessionBeforeGameOver)
                    .mockResolvedValueOnce(mockSessionAfterGameOver);;

        const res = await request(app)
            .post('/validate-click')
            .send({
                imageId: 'image123',
                xPercentage: 48,
                yPercentage: 47,
                sessionID: 'session123',
            });
            console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe('character1 found!');
        expect(res.body.gameover).toBe(true);
        expect(getImageById).toHaveBeenCalledWith('image123');
        expect(updateSession).toHaveBeenCalledWith('session123', 'character1', null);
        expect(updateSession).toHaveBeenCalledWith('session123', null, expect.any(Date));
    });

    test('should return failure when character is not found', async () => {
        const mockImage = {
            characters: [{ name: 'character1', pos: { x: 50, y: 50 } }],
        };

        getImageById.mockResolvedValue(mockImage);
        checkCharacterPos.mockReturnValue([null, false]);

        const res = await request(app)
            .post('/validate-click')
            .send({
                imageId: 'image123',
                xPercentage: 30,
                yPercentage: 20,
                sessionID: 'session123',
            });

        expect(res.statusCode).toBe(203);
        expect(res.body.msg).toBe('Character not Found');
        expect(getImageById).toHaveBeenCalledWith('image123');
        // expect(checkCharacterPos).toHaveBeenCalledWith(mockImage.characters, 30, 20);
    });

    test('should return 403 if sessionID is missing', async () => {
        const res = await request(app)
            .post('/validate-click')
            .send({
                imageId: 'image123',
                xPercentage: 48,
                yPercentage: 47,
            });

        expect(res.statusCode).toBe(403);
        expect(res.body.msg).toBe('Session not found');
    });

    test('should handle server errors gracefully', async () => {
        getImageById.mockRejectedValue(new Error('Database error'));

        const res = await request(app)
            .post('/validate-click')
            .send({
                imageId: 'image123',
                xPercentage: 48,
                yPercentage: 47,
                sessionID: 'session123',
            });

        expect(res.statusCode).toBe(500);
        expect(res.body.msg).toBe('Internal server error');
    });
});
