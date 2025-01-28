import { calculatePartners } from "../../src/api/calculate-partners";
import { ValidationError } from "../../src/error/ValidationError";
import { HttpStatusCodes } from "../../src/constants/HttpStatusCodes";

describe("calculatePartners - Input Validation", () => {
  it("throws nothing when input is valid", () => {
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

    // Act & Assert
    expect(() => calculatePartners(input)).not.toThrow();
  });

  it("throws ValidationError with UNPROCESSABLE_ENTITY when the number of leader_knowledge entries does not match total_leaders", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
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

    // Act & Assert
    try {
      calculatePartners(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.statusCode).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
      expect(error.message).toBe(
        "Invalid input: The number of leader_knowledge entries does not match total_leaders."
      );
    }
  });

  it("throws ValidationError with UNPROCESSABLE_ENTITY when the number of follower_knowledge entries does not match total_followers", () => {
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

    // Act & Assert
    try {
      calculatePartners(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.statusCode).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
      expect(error.message).toBe(
        "Invalid input: The number of follower_knowledge entries does not match total_followers."
      );
    }
  });

  it("throws ValidationError with BAD_REQUEST when total_leaders is missing", () => {
    // Arrange
    const input = {
      "total_followers": 1,
      "dance_styles": ["Waltz"],
      "leader_knowledge": {
        "1": ["Waltz"]
      },
      "follower_knowledge": {
        "A": ["Waltz"]
      },
      "dance_duration_minutes": 5
    } as any; // Cast to `any` to bypass type checking

    // Act & Assert
    try {
      calculatePartners(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.statusCode).toBe(HttpStatusCodes.BAD_REQUEST);
      expect(error.message).toBe("Missing input: total_leaders is required.");
    }
  });

  it("throws ValidationError with BAD_REQUEST when total_followers is missing", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
      "dance_styles": ["Waltz"],
      "leader_knowledge": {
        "1": ["Waltz"]
      },
      "follower_knowledge": {
        "A": ["Waltz"]
      },
      "dance_duration_minutes": 5
    } as any; // Cast to `any` to bypass type checking

    // Act & Assert
    try {
      calculatePartners(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.statusCode).toBe(HttpStatusCodes.BAD_REQUEST);
      expect(error.message).toBe("Missing input: total_followers is required.");
    }
  });

  it("throws ValidationError with BAD_REQUEST when leader_knowledge is missing or invalid", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
      "total_followers": 1,
      "dance_styles": ["Waltz"],
      "leader_knowledge": null,
      "follower_knowledge": {
        "A": ["Waltz"]
      },
      "dance_duration_minutes": 5
    } as any; // Cast to `any` to bypass type checking

    // Act & Assert
    try {
      calculatePartners(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.statusCode).toBe(HttpStatusCodes.BAD_REQUEST);
      expect(error.message).toBe(
        "Missing or invalid input: leader_knowledge must be an object."
      );
    }
  });

  it("throws ValidationError with BAD_REQUEST when follower_knowledge is missing or invalid", () => {
    // Arrange
    const input = {
      "total_leaders": 1,
      "total_followers": 1,
      "dance_styles": ["Waltz"],
      "leader_knowledge": {
        "1": ["Waltz"]
      },
      "follower_knowledge": [],
      "dance_duration_minutes": 5
    } as any; // Cast to `any` to bypass type checking

    // Act & Assert
    try {
      calculatePartners(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.statusCode).toBe(HttpStatusCodes.BAD_REQUEST);
      expect(error.message).toBe(
        "Missing or invalid input: follower_knowledge must be an object."
      );
    }
  });

  it("throws ValidationError with BAD_REQUEST when dance_duration_minutes is missing", () => {
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
      }
    } as any; // Cast to `any` to bypass type checking

    // Act & Assert
    try {
      calculatePartners(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.statusCode).toBe(HttpStatusCodes.BAD_REQUEST);
      expect(error.message).toBe(
        "Missing input: dance_duration_minutes is required."
      );
    }
  });
});
