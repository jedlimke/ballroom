interface CalculatePartnersInput {
    total_leaders: number;
    total_followers: number;
    dance_styles: string[];
    leader_knowledge: Record<string, string[]>;  // Ensuring leader knowledge is an object with string keys and array of dance styles
    follower_knowledge: Record<string, string[]>;  // Same for followers
    dance_duration_minutes: number;
  }
  
  export function calculatePartners(input: CalculatePartnersInput): number {
    const { total_leaders, total_followers, dance_styles, leader_knowledge, follower_knowledge, dance_duration_minutes } = input;
  
    // Validate input
    if (Object.keys(leader_knowledge).length !== total_leaders) {
      throw new Error('Invalid input: The number of leader_knowledge entries does not match total_leaders.');
    }
  
    if (Object.keys(follower_knowledge).length !== total_followers) {
      throw new Error('Invalid input: The number of follower_knowledge entries does not match total_followers.');
    }
  
    // Calculate the number of possible dances (each dance is 5 minutes)
    const total_dances = Math.floor(dance_duration_minutes / 5);
    
    // Initialize partner sets for tracking unique partners
    const partnerSets: Record<string, Set<string>> = {}; // Stores unique partners for each participant (leader/follower)
  
    // Function to randomly pick a dance style from the available styles
    const getRandomDanceStyle = () => {
      return dance_styles[Math.floor(Math.random() * dance_styles.length)];
    };
  
    // Simulate each dance round
    for (let danceIndex = 0; danceIndex < total_dances; danceIndex++) {
      // Randomly shuffle and pair leaders and followers for this dance
      const availableLeaders = Object.keys(leader_knowledge);
      const availableFollowers = Object.keys(follower_knowledge);
  
      // Simulate the dance: Leaders and followers are randomly matched
      const leader = availableLeaders[Math.floor(Math.random() * availableLeaders.length)];
      const follower = availableFollowers[Math.floor(Math.random() * availableFollowers.length)];
  
      // Randomly pick a dance style played by the venue
      const venueStyle = getRandomDanceStyle();
  
      // Check if leader and follower can dance together (both must know the style and the venue must play it)
      const canDance = leader_knowledge[leader].includes(venueStyle) && follower_knowledge[follower].includes(venueStyle);
  
      // If they can dance, add each other to their partner sets (unique partners)
      if (canDance) {
        if (!partnerSets[leader]) partnerSets[leader] = new Set();
        if (!partnerSets[follower]) partnerSets[follower] = new Set();
  
        partnerSets[leader].add(follower);
        partnerSets[follower].add(leader);
      }
    }
  
    // Calculate the total number of unique partners across all participants
    const totalPartners = Object.values(partnerSets).reduce((sum, set) => sum + set.size, 0);
  
    // Total number of participants (leaders + followers)
    const totalParticipants = total_leaders + total_followers;
  
    // Return the average partners per participant
    return totalParticipants > 0 ? totalPartners / totalParticipants : 0;
  }
  