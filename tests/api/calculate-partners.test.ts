import { calculatePartners } from '../../src/api/calculate-partners';

describe('calculatePartners', () => {

    /*
        INVALID INPUT TESTS
    */

    it('returns 422 when the number of leader_knowledge entries does not match total_leaders', () => {
        // Arrange
        const input = {
            "total_leaders": 3,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"],
                "2": ["Tango"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 5
        };

        // Act & Assert: Expect error
        expect(() => calculatePartners(input)).toThrow('Invalid input: The number of leader_knowledge entries does not match total_leaders.');
    });

    it('returns 422 when the number of follower_knowledge entries does not match total_followers', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"],
                "B": ["Tango"]
            },
            "dance_duration_minutes": 5
        };

        // Act & Assert: Expect error
        expect(() => calculatePartners(input)).toThrow('Invalid input: The number of follower_knowledge entries does not match total_followers.');
    });

    it('does not return 422 when entry counts match corresponding totals', () => {
        // Arrange
        const input = {
            "total_leaders": 3,
            "total_followers": 2,
            "dance_styles": ["Waltz", "Tango"],
            "leader_knowledge": {
                "1": ["Waltz"],
                "2": ["Tango"],
                "3": ["Waltz", "Tango"]
            },
            "follower_knowledge": {
                "A": ["Waltz", "Tango"],
                "B": ["Tango"]
            },
            "dance_duration_minutes": 10
        };

        // Act & Assert: No error should be thrown
        expect(() => calculatePartners(input)).not.toThrow();
    });

    /*
        LOGIC TESTS
    */

    it('returns one partner because one leader, one follower, one overlapping style, venue plays that style, 5 minutes at venue', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 5
        };

        // Act: Calculate the number of dances
        const result = calculatePartners(input);

        // Assert: Expect 1 unique partner.
        expect(result).toBe(1);
    });

    it('returns one partner because one leader, one follower, one overlapping style, venue plays that style, 10 minutes at venue', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 10 // Enough time for 2 dances
        };

        // Act
        const result = calculatePartners(input);

        // Assert: Expect 1 partner (They have time for two dances, but they still only have one unique partner)
        expect(result).toBe(1);
    });

    it('returns one partner because one leader, one follower, one overlapping style, venue plays that style, 500 minutes at venue', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 500 // Enough time for 100 dances
        };

        // Act
        const result = calculatePartners(input);

        // Assert: Expect 1 partner (They have time for 100 dances, but they still only have one unique partner)
        expect(result).toBe(1);
    });

    it('returns 1-1/3 partners on average as we have a follower shortage but lots of time', () => {
        // Arrange
        const input = {
            "total_leaders": 2,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"],
                "2": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 1000 // Enough time for many dances
        };

        // Act
        const result = calculatePartners(input);

        // Assert: Expect 4 / 3 partners on average.
        // (3 compatible people, but only one follower, so:
        // leader1: 1 partner, leader2: 1 partner, followerA: 2 partners, therefore 4/3 on avg.
        expect(result).toBe(4 / 3);
    });

    it('returns zero partners because, despite being a great match, the venue is open 0 minutes', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 0 // Enough time for 0 dances
        };

        // Act
        const result = calculatePartners(input);

        // Assert: Expect 0 partners because there's no time
        expect(result).toBe(0);
    });

    it('returns zero partners because, despite being a great match, the venue is open only 4 minutes, which isn\'t enough time to dance', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Waltz"],
            "leader_knowledge": {
                "1": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 4 // Just short on time
        };

        // Act
        const result = calculatePartners(input);

        // Assert: Expect 0 partners because there's not enough time
        expect(result).toBe(0);
    });

    it('returns zero partners because venue does not play the overlapping style, so they can never dance together', () => {
        // Arrange: Setup with one leader and one follower, but venue does not play a style they know
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Charleston"], // Disjoint dance style
            "leader_knowledge": {
                "1": ["Waltz"]
            },
            "follower_knowledge": {
                "A": ["Waltz"]
            },
            "dance_duration_minutes": 5
        };

        // Act: Calculate the number of dances
        const result = calculatePartners(input);

        // Assert: Expect 0 partners as they style they know never gets played
        expect(result).toBe(0);
    });

    it('returns zero partners because no overlapping style, and venue plays style only one dancer knows, 5 minutes at venue', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Tango"],
            "leader_knowledge": {
                "1": ["Tango"] // No matching style
            },
            "follower_knowledge": {
                "A": ["Foxtrot"] // No matching style
            },
            "dance_duration_minutes": 5
        };

        // Act
        const result = calculatePartners(input);

        // Assert: Expect 0 partners as there's no overlap in knowledge
        expect(result).toBe(0);
    });

    it('returns zero dances because no overlapping style, and venue does not play a style they know, 5 minutes at venue', () => {
        // Arrange
        const input = {
            "total_leaders": 1,
            "total_followers": 1,
            "dance_styles": ["Charleston"], // Disjoint dance style
            "leader_knowledge": {
                "1": ["Tango"]
            },
            "follower_knowledge": {
                "A": ["Foxtrot"]
            },
            "dance_duration_minutes": 5
        };

        // Act
        const result = calculatePartners(input);

        // Assert: Expect 0 partners as there's no match or venue participation
        expect(result).toBe(0);
    });

    it('returns zero partners when no one can dance because of style mismatches', () => {
        // Arrange: No leader or follower can match the available styles.
        const input = {
            "total_leaders": 2,
            "total_followers": 2,
            "dance_styles": ["Salsa"],
            "leader_knowledge": {
                "1": ["Waltz"],
                "2": ["Tango"]
            },
            "follower_knowledge": {
                "A": ["Foxtrot"],
                "B": ["Cha-cha"]
            },
            "dance_duration_minutes": 10
        };
    
        // Act: Calculate the number of partners
        const result = calculatePartners(input);
    
        // Assert: Expect 0 partners, as there’s no overlap in dance knowledge.
        expect(result).toBe(0);
    });
    
    it('returns zero partners when no one knows any dance styles', () => {
        // Arrange: No one knows any style, and venue plays "Salsa"
        const input = {
            "total_leaders": 5,
            "total_followers": 5,
            "dance_styles": ["Salsa"],
            "leader_knowledge": {
                "1": [],
                "2": [],
                "3": [],
                "4": [],
                "5": []
            },
            "follower_knowledge": {
                "A": [],
                "B": [],
                "C": [],
                "D": [],
                "E": []
            },
            "dance_duration_minutes": 10
        };
    
        // Act
        const result = calculatePartners(input);
    
        // Assert: Expect 0 partners as no one knows any style
        expect(result).toBe(0);
    });
    
    it('returns the correct number of partners for a large number of leaders and followers', () => {
        // Arrange: 100 leaders and 100 followers, all know "Salsa" and venue plays "Salsa"
        const input = {
            "total_leaders": 100,
            "total_followers": 100,
            "dance_styles": ["Salsa"],
            "leader_knowledge": Object.fromEntries(
                Array.from({ length: 100 }, (_, i) => [`${i + 1}`, ["Salsa"]])
            ),
            "follower_knowledge": Object.fromEntries(
                Array.from({ length: 100 }, (_, i) => [`${String.fromCharCode(65 + i)}`, ["Salsa"]])
            ),
            "dance_duration_minutes": 1000 // Enough time for many dances
        };
    
        // Act
        const result = calculatePartners(input);
    
        // Assert: Since everyone can dance together, expect 2 partners per participant
        expect(result).toBeCloseTo(2, 0);
    });
    
});
