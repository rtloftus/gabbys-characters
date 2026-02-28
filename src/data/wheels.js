export const wheels = {
  archetype: {
    label: "Character Archetype",
    options: [
      "Caregiver",
      "Rebel",
      "Outsider",
      "Dreamer",
      "Protector",
      "Explorer",
      "Skeptic",
      "Achiever"
    ],
    next: "trait"
  },

  trait: {
    label: "Core Trait",
    options: [
      "Impulsive",
      "Secretive",
      "Overly honest",
      "Approval-seeking",
      "Stubborn",
      "Curious",
      "Distrustful",
      "Self-sacrificing"
    ],
    next: "conflict"
  },

  conflict: {
    label: "Internal Conflict",
    options: [
      "Wants love vs fears vulnerability",
      "Wants freedom vs fears failure",
      "Wants truth vs fears consequences",
      "Wants control vs fears responsibility",
      "Wants belonging vs fears rejection"
    ],
    next: "pressure"
  },

  pressure: {
    label: "External Pressure",
    options: [
      "Family expectations",
      "Financial crisis",
      "Rival appears",
      "Hidden secret exposed",
      "Time running out",
      "Forced partnership"
    ],
    next: "relationship"
  },

  relationship: {
    label: "Key Relationship",
    options: [
      "Mentor they resent",
      "Rival who mirrors them",
      "Friend hiding something",
      "Love interest with opposing goals",
      "Dependent sibling",
      "Former ally turned enemy"
    ],
    next: "storyDirection"
  },

  storyDirection: {
    label: "Story Direction",
    options: [
      "Must betray a belief",
      "Forced to choose between loyalties",
      "Learns their goal is wrong",
      "Becomes what they feared",
      "Sacrifices success for connection"
    ],
    next: null
  }
};