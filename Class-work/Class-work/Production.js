const express = require("express");

const app = express();

app.use(express.json());

// Example data
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" }
];

/**
 * DELETE /users/:id
 * Delete a user by ID
 */
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const userId = Number(id);

    // Find user
    const userIndex = users.findIndex(user => user.id === userId);

    // User does not exist
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Remove user
    const [deletedUser] = users.splice(userIndex, 1);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser
    });

  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});