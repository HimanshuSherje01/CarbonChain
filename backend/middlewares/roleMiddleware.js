const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.user_metadata?.role;

    if (!role) {
      return res.status(403).json({ message: "Role not assigned" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: `Access denied for role: ${role}`,
      });
    }

    next();
  };
};

export default roleMiddleware;
