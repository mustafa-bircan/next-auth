export const adminDashboardData = {
    products: {
        rugs: {
            dailyProduced: 120,
            waste: 5,
            totalProduced: 35000,
            totalSold: 30000,
            stock: 5000,
            pricePerUnit: 120,
        },
        kilims: {
            dailyProduced: 80,
            waste: 3,
            totalProduced: 20000,
            totalSold: 18000,
            stock: 2000,
            pricePerUnit: 100,
        },
        pillows: {
            dailyProduced: 200,
            waste: 10,
            totalProduced: 45000,
            totalSold: 42000,
            stock: 3000,
            pricePerUnit: 70,
        },
        others: {
            dailyProduced: 50,
            waste: 1,
            totalProduced: 15000,
            totalSold: 14000,
            stock: 1000,
            pricePerUnit: 50,
        },
    },

    fireRates: {
        rugs: (5 / 120) * 100,
        kilims: (3 / 80) * 100,
        pillows: (10 / 200) * 100,
        others: (1 / 50) * 100,
    },

    salesByCountry: [
        {
            country: "USA",
            totalSoldUnits: 5000,
            amountSoldTL: 600000,
            amountInTransitUnits: 1200,
            amountInTransitTL: 144000,
            topClients: [
                {
                    company: "US Rugs Inc.",
                    contactName: "John Doe",
                    email: "john.doe@usrugs.com",
                    phone: "+1-202-555-0171",
                },
                {
                    company: "American Kilims",
                    contactName: "Sarah Smith",
                    email: "s.smith@americankilims.com",
                    phone: "+1-202-555-0114",
                },
            ],
        },
        {
            country: "Germany",
            totalSoldUnits: 3500,
            amountSoldTL: 420000,
            amountInTransitUnits: 700,
            amountInTransitTL: 84000,
            topClients: [
                {
                    company: "Berlin Pillows GmbH",
                    contactName: "Hans Müller",
                    email: "h.mueller@berlinpillows.de",
                    phone: "+49-30-1234567",
                },
            ],
        },
        {
            country: "Turkey",
            totalSoldUnits: 2500,
            amountSoldTL: 300000,
            amountInTransitUnits: 300,
            amountInTransitTL: 36000,
            topClients: [
                {
                    company: "Istanbul Rugs Ltd.",
                    contactName: "Ayşe Yılmaz",
                    email: "ayse@istanbulrugs.com",
                    phone: "+90-212-555-3344",
                },
                {
                    company: "Ankara Kilims Co.",
                    contactName: "Mehmet Demir",
                    email: "mehmet@ankarakilims.com",
                    phone: "+90-312-555-6677",
                },
            ],
        },
    ],

    payments: {
        totalReceivedTL: 1320000,
        totalPendingTL: 250000,
        receivedByMonth: {
            january: 100000,
            february: 110000,
            march: 120000,
            april: 130000,
            may: 140000,
            june: 150000,
            july: 160000,
            august: 170000,
            september: 180000,
            october: 190000,
            november: 200000,
            december: 210000,
        },
    },

    productionStats: {
        daily: 450,
        weekly: 3150,
        monthly: 13500,
        yearly: 162000,
    },

    logistics: {
        shipmentsInTransit: 2200,
        deliveredShipments: 18000,
    },
};
