
export const mockProjects = [
    {
        id: "CC-2024-001",
        name: "Mangrove Restoration Initiative - Sundarbans",
        location: "West Bengal, India",
        developer: "GreenEarth NGO",
        type: "Reforestation",
        estimatedCredits: 50000,
        status: "Verified",
        submissionDate: "2024-01-15",
        description: "This project aims to restore 500 hectares of degraded mangrove forests in the Sundarbans Delta. By planting native species like Avicennia and Rhizophora, the project enhances carbon sequestration, protects against coastal erosion, and supports local biodiversity.",
        area: "500 hectares",
        methodology: "VM0033 (Verified Carbon Standard)",
        ipfsCid: "QmX7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7",
        evidence: [
            { name: "Project Design Document (PDD)", date: "2024-01-15", type: "PDF" },
            { name: "Land Tenure Certificate", date: "2023-12-10", type: "PDF" },
            { name: "Baseline Carbon Survey", date: "2024-01-05", type: "XLSX" },
        ],
        timeline: [
            { date: "2024-03-10", status: "Verified", note: "Third-party verification complete." },
            { date: "2024-02-15", status: "Pending Verification", note: "Assigned to independent verifier." },
            { date: "2024-01-15", status: "Submitted", note: "Project proposal submitted by GreenEarth NGO." },
        ]
    },
    {
        id: "CC-2024-002",
        name: "Coastal Seagrass Project",
        location: "Kerala, India",
        developer: "OceanBlue Foundation",
        type: "Conservation",
        estimatedCredits: 25000,
        status: "Pending Verification",
        submissionDate: "2024-02-10",
        description: "Conservation of 200 hectares of seagrass meadows along the Kerala coast. The project focuses on preventing trawling damage and monitoring seagrass health to maintain carbon sinks.",
        area: "200 hectares",
        methodology: "VM0033",
        ipfsCid: "QmY8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r8",
        evidence: [
            { name: "Project Map", date: "2024-02-10", type: "PNG" },
            { name: "Initial Biodiversity Report", date: "2024-02-01", type: "PDF" },
        ],
        timeline: [
            { date: "2024-02-10", status: "Submitted", note: "Project submitted for review." },
            { date: "2024-02-12", status: "Pending Verification", note: "Under preliminary review." },
        ]
    },
    {
        id: "CC-2024-003",
        name: "Wetland Recovery Program",
        location: "Odisha, India",
        developer: "Wetlands Watch",
        type: "Restoration",
        estimatedCredits: 12000,
        status: "Submitted",
        submissionDate: "2024-03-01",
        description: "Restoring hydrology to 150 hectares of dried wetlands. Reintroducing native reeds and grasses to restart peat formation and carbon capture.",
        area: "150 hectares",
        methodology: "VM0033",
        ipfsCid: "QmZ9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r9",
        evidence: [
            { name: "Hydrology Study", date: "2024-02-28", type: "PDF" },
        ],
        timeline: [
            { date: "2024-03-01", status: "Submitted", note: "Application received." },
        ]
    },
    {
        id: "CC-2024-004",
        name: "Blue Carbon - Andaman Isles",
        location: "Andaman & Nicobar Islands",
        developer: "Island Eco Trust",
        type: "Conservation",
        estimatedCredits: 85000,
        status: "Rejected",
        submissionDate: "2023-11-20",
        description: "Large scale conservation proposal for coral and mangrove ecosystems. Rejected due to overlapping land claims.",
        area: "1200 hectares",
        methodology: "VM0033",
        ipfsCid: "QmA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9",
        evidence: [],
        timeline: [
            { date: "2023-12-05", status: "Rejected", note: "Land tenure dispute identified." },
            { date: "2023-11-20", status: "Submitted", note: "Proposal submitted." },
        ]
    },
];

export const mockStats = {
    ngo: [
        { label: "Active Projects", value: "3" },
        { label: "Pending Approval", value: "1" },
        { label: "Credits Generated", value: "12,500" },
    ],
    verifier: [
        { label: "Pending Reviews", value: "5" },
        { label: "Verified This Month", value: "12" },
        { label: "Avg. Verification Time", value: "8 Days" },
    ],
    corporate: [
        { label: "Credits Purchased", value: "150,000" },
        { label: "Offset Impact", value: "150k Tons" },
        { label: "Certificates", value: "12" },
    ],
    admin: [
        { label: "Total Projects", value: "124" },
        { label: "Total Credits Issued", value: "2.4M" },
        { label: "Active Users", value: "850" },
    ]
}

export const mockTransactions = [
    { id: "TX-998", project: "Mangrove Restoration", credits: 500, date: "2024-03-10", amount: "$12,500" },
    { id: "TX-999", project: "Coastal Seagrass", credits: 200, date: "2024-03-08", amount: "$4,000" },
]
