/// <reference types="cypress" />

describe("API Order Creation Tests", () => {
  const validOrderData = {
    createdBy: "user",
    carId: "123",
    clientEmail: "test@example.com",
    clientId: "670d2962a103e117df42f3f8",
    phoneNumber: "+1 234 567 8965",
    orderType: "rent",
    orderStatus: "active",
    cost: 10,
    time: {
      startDate: new Date().toISOString(),
      endDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString(),
    },
  };

  const invalidOrderData = {
    carId: "123",
    clientEmail: "test@example.com",
    clientId: "user-id",
    phoneNumber: "123456789",
    orderType: "oil change",
    orderStatus: "active",
    time: {
      startDate: new Date().toISOString(),
      endDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString(),
    },
  };

  it('Should allow user to create a "rent" order', () => {
    cy.loginToApplication().then(() => {
      cy.window().then((win) => {
        const userToken = win.localStorage.getItem("authToken");
        expect(userToken).to.not.be.null;
        cy.request({
          method: "POST",
          url: "https://server-osz5.onrender.com/api/orders/create",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: validOrderData,
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.orderType).to.eq("rent");
          expect(response.body.createdBy).to.eq("user");
        });
      });
    });
  });

  it('Should allow admin to create "rent" order', () => {
    cy.loginAdmin().then(() => {
      cy.window().then((win) => {
        const adminToken = win.localStorage.getItem("authToken");
        expect(adminToken).to.not.be.null;
        const adminOrderData = {
          ...validOrderData,
          orderType: "rent",
          createdBy: "admin",
        };
        cy.request({
          method: "POST",
          url: "https://server-osz5.onrender.com/api/orders/create",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          body: adminOrderData,
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.orderType).to.eq("rent");
          expect(response.body.createdBy).to.eq("admin");
        });
      });
    });
  });

  it('Should allow admin to create "oil change" order', () => {
    cy.loginAdmin().then(() => {
      cy.window().then((win) => {
        const adminToken = win.localStorage.getItem("authToken");
        expect(adminToken).to.not.be.null;
        const adminOrderData = {
          ...validOrderData,
          orderType: "oil change",
          createdBy: "admin",
        };
        cy.request({
          method: "POST",
          url: "https://server-osz5.onrender.com/api/orders/create",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          body: adminOrderData,
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.orderType).to.eq("oil change");
          expect(response.body.createdBy).to.eq("admin");
        });
      });
    });
  });

  it('Should not allow user to create "oil change" order', () => {
    cy.loginAdmin().then(() => {
      cy.window().then((win) => {
        const adminToken = win.localStorage.getItem("authToken");
        expect(adminToken).to.not.be.null;
        const adminOrderData = {
          ...validOrderData,
          orderType: "oil change",
        };
        cy.request({
          method: "POST",
          url: "https://server-osz5.onrender.com/api/orders/create",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          failOnStatusCode: false,
          body: adminOrderData,
        }).then((response) => {
            cy.log(response)
          expect(response.status).to.eq(403);
          expect(response.body.message).to.eq("User can only create rent orders");
        });
      });
    });
  });

  it('Should allow admin to create "repair" order', () => {
    cy.loginAdmin().then(() => {
        cy.window().then((win) => {
          const adminToken = win.localStorage.getItem("authToken");
          expect(adminToken).to.not.be.null;
          const adminOrderData = {
            ...validOrderData,
            orderType: "repair",
            createdBy: "admin",
          };
          cy.request({
            method: "POST",
            url: "https://server-osz5.onrender.com/api/orders/create",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
            body: adminOrderData,
          }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.orderType).to.eq("repair");
            expect(response.body.createdBy).to.eq("admin");
          });
        });
      });
  });

  it('Should allow admin to create "maintenance" order', () => {
    cy.loginAdmin().then(() => {
        cy.window().then((win) => {
          const adminToken = win.localStorage.getItem("authToken");
          expect(adminToken).to.not.be.null;
          const adminOrderData = {
            ...validOrderData,
            orderType: "maintenance",
            createdBy: "admin",
          };
          cy.request({
            method: "POST",
            url: "https://server-osz5.onrender.com/api/orders/create",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
            body: adminOrderData,
          }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.orderType).to.eq("maintenance");
            expect(response.body.createdBy).to.eq("admin");
          });
        });
      });
  });

  it('Should allow admin to create "insurance" order', () => {
    cy.loginAdmin().then(() => {
        cy.window().then((win) => {
          const adminToken = win.localStorage.getItem("authToken");
          expect(adminToken).to.not.be.null;
          const adminOrderData = {
            ...validOrderData,
            orderType: "insurance",
            createdBy: "admin",
          };
          cy.request({
            method: "POST",
            url: "https://server-osz5.onrender.com/api/orders/create",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
            body: adminOrderData,
          }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.orderType).to.eq("insurance");
            expect(response.body.createdBy).to.eq("admin");
          });
        });
      });
  });
});
