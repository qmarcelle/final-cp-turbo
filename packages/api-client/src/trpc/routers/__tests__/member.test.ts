import { TRPCError } from '@trpc/server';
import { appRouter, type AppRouter } from '../../root'; // Adjust path as necessary
import { MemberService } from '../../../services/member-service'; // Adjust path as necessary
import type { CreateContextOptions } from '../../context'; // Adjust path as necessary
import { MemberSchema, type Member, type ContextType, type LookupType } from '../../types'; // Adjust path as necessary
import { vi } from 'vitest'; // Assuming vitest, change if using Jest (jest)

// Mock the MemberService
vi.mock('../../../services/member-service'); // Adjust path as necessary

const mockMember: Member = {
  memberCk: 'MCK123',
  subscriberCk: 'SCK456',
  subscriberId: 'SUB789',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  groupId: 'GRP100',
  // Optional fields can be omitted or included:
  // suffix: 'Jr.',
  // ssn: '000-00-0000', 
  // relationship: 'Self',
};

describe('Member Router', () => {
  // let mockedMemberService: vi.Mocked<MemberService>; // Not directly used when mocking prototype

  beforeEach(() => {
    vi.resetAllMocks();
    // No need to instantiate MemberService here if we are mocking its prototype methods
    // The router will create its own instance, which will pick up the mocked prototype methods.
  });

  const createTestContext = (opts: Partial<CreateContextOptions> = {}): CreateContextOptions => ({
    req: undefined, 
    res: undefined, 
    baseUrl: 'http://localhost:3000/api/trpc',
    portalLogin: 'testUser',
    enableMocks: false,
    user: { id: 'user123', name: 'Test User' }, 
    ...opts,
  });

  const caller = appRouter.createCaller(createTestContext());

  // Test suite for getMember
  describe('getMember procedure', () => {
    it('should return member data on successful fetch', async () => {
      // Arrange
      const input = { lookup: 'memberId' as LookupType, memberId: '12345', context: 'common' as ContextType }; // memberId is a generic ID here, not necessarily matching mockMember.memberId
      // Mock the prototype method
      (MemberService.prototype.getMember as vi.Mock).mockResolvedValue({ data: mockMember });

      // Act
      const result = await caller.member.getMember(input);

      // Assert
      expect(result).toEqual(mockMember);
      expect(MemberService.prototype.getMember).toHaveBeenCalledWith(input.lookup, input.memberId);
      // Verify the service was instantiated (optional, if needed for specific checks)
      // expect(MemberService).toHaveBeenCalledTimes(1); // MemberService constructor
    });

    it('should throw TRPCError on service failure', async () => {
      // Arrange
      const input = { lookup: 'memberId' as LookupType, memberId: '12345', context: 'common' as ContextType };
      const errorMessage = 'Network Error';
      (MemberService.prototype.getMember as vi.Mock).mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(caller.member.getMember(input))
        .rejects.toThrowError(TRPCError);
      
      // Check for specific TRPCError properties
      try {
        await caller.member.getMember(input);
      } catch (error: any) {
        expect(error).toBeInstanceOf(TRPCError);
        expect(error.message).toBe('Failed to fetch member');
        expect(error.cause?.message).toBe(errorMessage);
      }
    });

    // TODO: Add test for invalid input if Zod parsing is expected to fail before hitting the service
  });

  // TODO: Add test suites for getMemberData, searchMembers, getEligibility
});
