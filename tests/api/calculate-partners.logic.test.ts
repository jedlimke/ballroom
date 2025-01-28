import { calculatePartners } from "../../src/api/calculate-partners";

describe("calculatePartners - Logic", () => {
  it("returns one partner because one leader, one follower, one overlapping style, venue plays that style, 5 minutes at venue", () => {
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

  it("returns one partner because one leader, one follower, one overlapping style, venue plays that style, 10 minutes at venue", () => {
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
      "dance_duration_minutes": 10
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect 1 partner
    expect(result).toBe(1);
  });

  it("returns one partner because one leader, one follower, one overlapping style, venue plays that style, 500 minutes at venue", () => {
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
      "dance_duration_minutes": 500
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect 1 partner
    expect(result).toBe(1);
  });

  it("returns 1-1/3 partners on average as we have a follower shortage but lots of time", () => {
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
      "dance_duration_minutes": 1000
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect 4 / 3 partners on average
    expect(result).toBe(4 / 3);
  });

  it("returns zero partners because, despite being a great match, the venue is open 0 minutes", () => {
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
      "dance_duration_minutes": 0
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns zero partners because, despite being a great match, the venue is open only 4 minutes, which isn't enough time to dance", () => {
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
      "dance_duration_minutes": 4
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns zero partners because venue does not play the overlapping style, so they can never dance together", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
      "total_followers": 1,
      "dance_styles": ["Charleston"],
      "leader_knowledge": {
        "1": ["Waltz"]
      },
      "follower_knowledge": {
        "A": ["Waltz"]
      },
      "dance_duration_minutes": 5
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns zero partners because no overlapping style, and venue plays style only the leader knows, 5 minutes at venue", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
      "total_followers": 1,
      "dance_styles": ["Tango"],
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

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns zero partners because no overlapping style, and venue plays style only the follower knows, 5 minutes at venue", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
      "total_followers": 1,
      "dance_styles": ["Foxtrot"],
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

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns zero dances because no overlapping style, and venue does not play a style they know, 5 minutes at venue", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
      "total_followers": 1,
      "dance_styles": ["Charleston"],
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

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns zero partners when no one knows any dance styles", () => {
    // Arrange
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

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns zero partners when the venue doesn't allow dancing", () => {
    // Arrange
    const input = {
      "total_leaders": 5,
      "total_followers": 5,
      "dance_styles": [],
      "leader_knowledge": {
        "1": ["Rock"],
        "2": ["Rock"],
        "3": ["Rock"],
        "4": ["Rock"],
        "5": ["Rock"]
      },
      "follower_knowledge": {
        "A": ["Rock"],
        "B": ["Rock"],
        "C": ["Rock"],
        "D": ["Rock"],
        "E": ["Rock"]
      },
      "dance_duration_minutes": 10
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect 0 partners
    expect(result).toBe(0);
  });

  it("returns the correct number of partners for a large number of leaders and followers", () => {
    // Arrange
    const input = {
      "total_leaders": 10,
      "total_followers": 10,
      "dance_styles": ["Salsa"],
      "leader_knowledge": Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [
          `${i + 1}`, // Leader ID as a string (e.g., "1", "2", ..., "100")
          ["Salsa"]   // Dance style(s) known by this leader
        ])
      ),
      // Generate follower knowledge: Each follower (ID "A..Z..") knows "Salsa"
      "follower_knowledge": Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [
          `${String.fromCharCode(65 + i)}`, // Follower ID as a string (e.g., "A", "B", ...)
          ["Salsa"]                         // Dance style(s) known by this follower
        ])
      ),
      "dance_duration_minutes": 145
    };

    // Act
    const result = calculatePartners(input);

    // Assert: Expect the result to be within 10% of the expected value
    const expectedAveragePartners = input.total_leaders;
    const margin = expectedAveragePartners * 0.10; // 10% margin
    expect(result).toBeGreaterThan(expectedAveragePartners - margin);
    expect(result).toBeLessThan(expectedAveragePartners + margin);
  });
});
