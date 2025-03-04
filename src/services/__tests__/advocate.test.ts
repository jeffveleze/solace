import { AdvocateService } from '../advocate';
import db from '@/db';
import { advocates } from '@/db/schema';

// Mock the database
jest.mock('@/db', () => ({
  select: jest.fn(),
  insert: jest.fn(),
}));

describe('AdvocateService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAdvocates', () => {
    it('should return all advocates', async () => {
      // Mock data
      const mockAdvocates = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
      ];

      // Setup mock implementation
      const mockFrom = jest.fn().mockResolvedValue(mockAdvocates);
      const mockSelect = jest.fn().mockReturnValue({ from: mockFrom });
      (db.select as jest.Mock).mockImplementation(mockSelect);

      // Call the service method
      const result = await AdvocateService.getAllAdvocates();

      // Assertions
      expect(db.select).toHaveBeenCalled();
      expect(mockFrom).toHaveBeenCalledWith(advocates);
      expect(result).toEqual(mockAdvocates);
    });

    it('should throw an error when database query fails', async () => {
      // Setup mock to throw an error
      const mockFrom = jest.fn().mockRejectedValue(new Error('Database error'));
      const mockSelect = jest.fn().mockReturnValue({ from: mockFrom });
      (db.select as jest.Mock).mockImplementation(mockSelect);

      // Assertions
      await expect(AdvocateService.getAllAdvocates()).rejects.toThrow(
        'Failed to fetch advocates'
      );
    });
  });

  describe('seedAdvocates', () => {
    it('should seed advocates', async () => {
      const mockAdvocates = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          city: 'New York',
          degree: 'Bachelor',
          yearsOfExperience: 5,
          phoneNumber: 1234567890,
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          city: 'Los Angeles',
          degree: 'Master',
          yearsOfExperience: 3,
          phoneNumber: 9876543210,
        },
      ];

      // Setup mock implementation
      const mockReturning = jest.fn().mockResolvedValue(mockAdvocates);
      const mockValues = jest
        .fn()
        .mockReturnValue({ returning: mockReturning });
      const mockInsert = jest.fn().mockReturnValue({ values: mockValues });
      (db.insert as jest.Mock).mockImplementation(mockInsert);

      // Call the service method
      const result = await AdvocateService.seedAdvocates(mockAdvocates);

      // Assertions
      expect(db.insert).toHaveBeenCalled();
      expect(mockValues).toHaveBeenCalledWith(mockAdvocates);
      expect(result).toEqual({ advocates: mockAdvocates });
    });

    it('should throw an error when database insertion fails', async () => {
      // Setup mock to throw an error
      const mockValues = jest.fn().mockReturnValue({
        values: jest.fn().mockRejectedValue(new Error('Database error')),
      });
      const mockAdvocates = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          city: 'New York',
          degree: 'Bachelor',
          yearsOfExperience: 5,
          phoneNumber: 1234567890,
        },
      ];
      const mockInsert = jest.fn().mockReturnValue({ values: mockValues });
      (db.insert as jest.Mock).mockImplementation(mockInsert);

      // Assertions
      await expect(
        AdvocateService.seedAdvocates(mockAdvocates)
      ).rejects.toThrow('Failed to seed advocates');
    });
  });
});
