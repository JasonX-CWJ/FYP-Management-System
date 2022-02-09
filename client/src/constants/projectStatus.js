const STATUS = {
    PROPOSED: "proposed", // by students
    PENDING: "pending", // lecturer accept proposed/make new title, go to admin
    ACCEPT: "accept", // admin accept pending, display as available in project repo & lecturer's accepted title
    REJECT: "reject", // admin reject pending, go to lecturer reject and student reject
    APPLIED: "applied", // student applied active
    ACTIVE: "active", // admin accept pending
};

export default STATUS;
