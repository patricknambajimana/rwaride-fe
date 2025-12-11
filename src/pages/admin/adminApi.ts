// Mock data for frontend-only development

// Mock Stats
export const MOCK_STATS = {
  stats: {
    totalUsers: 1250,
    totalTrips: 4523,
    totalBookings: 3847,
    activeTrips: 156,
  },
};

// Mock Users
export const MOCK_USERS = {
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "driver",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "passenger",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "driver",
      status: "suspended",
    },
    {
      id: "4",
      name: "Emily Brown",
      email: "emily@example.com",
      role: "passenger",
      status: "active",
    },
    {
      id: "5",
      name: "Alex Wilson",
      email: "alex@example.com",
      role: "driver",
      status: "active",
    },
  ],
};

// Mock Trips
export const MOCK_TRIPS = {
  trips: [
    {
      id: "1",
      driver_name: "John Doe",
      from_location: "Kigali",
      to_location: "Huye",
      departure_date: "2025-12-12T08:00:00",
      available_seats: 3,
      status: "active",
    },
    {
      id: "2",
      driver_name: "Alex Wilson",
      from_location: "Muhanga",
      to_location: "Kigali",
      departure_date: "2025-12-12T10:30:00",
      available_seats: 2,
      status: "active",
    },
    {
      id: "3",
      driver_name: "John Doe",
      from_location: "Kigali",
      to_location: "Musanze",
      departure_date: "2025-12-13T14:00:00",
      available_seats: 4,
      status: "active",
    },
    {
      id: "4",
      driver_name: "Mike Johnson",
      from_location: "Gisenyi",
      to_location: "Kigali",
      departure_date: "2025-12-11T09:00:00",
      available_seats: 0,
      status: "completed",
    },
  ],
};

// Admin API service with mock data
export const adminApi = {
  fetchStats: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_STATS;
  },

  fetchUsers: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_USERS;
  },

  suspendUser: async (userId: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Update mock data
    const user = MOCK_USERS.users.find((u) => u.id === userId);
    if (user) {
      user.status = "suspended";
    }
    return { success: true };
  },

  activateUser: async (userId: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Update mock data
    const user = MOCK_USERS.users.find((u) => u.id === userId);
    if (user) {
      user.status = "active";
    }
    return { success: true };
  },

  fetchTrips: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_TRIPS;
  },
};
