// เริ่มต้นชุดทดสอบ Todo List
describe('Todo List Test', () => {

    // เปิดหน้า Todo List ก่อนเริ่มทดสอบแต่ละกรณี
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo');
    });

    // TC01: ตรวจสอบจำนวนรายการเริ่มต้น
    it('TC01 - Check default todos', () => {

        // ค้นหารายการ Todo ทั้งหมด
        cy.get('.todo-list li')

            // ตรวจสอบว่ามีรายการ Todo จำนวน 2 รายการ
            .should('have.length', 2);

    });

    // TC02: เพิ่มรายการใหม่
    it('TC02 - Add new todo', () => {

        // ค้นหาช่องเพิ่ม Todo แล้วพิมพ์ข้อความ
        cy.get('.new-todo').type('Study Cypress');

        // กด Enter เพื่อเพิ่มรายการ
        cy.get('.new-todo').type('{enter}');

        // ตรวจสอบว่ามีรายการ Study Cypress ปรากฏอยู่
        cy.get('.todo-list li')
            .should('contain.text', 'Study Cypress');

    });

    // TC03: เพิ่มรายการหลายรายการ
    it('TC03 - Add multiple todos', () => {

        // เพิ่มรายการแรก
        cy.get('.new-todo').type('Read book{enter}');

        // เพิ่มรายการที่สอง
        cy.get('.new-todo').type('Practice coding{enter}');

        // ตรวจสอบว่ามีรายการทั้งหมด 4 รายการ
        // เพราะเริ่มต้นมี 2 รายการ แล้วเพิ่มอีก 2 รายการ
        cy.get('.todo-list li')
            .should('have.length', 4);

    });

    // TC04: เลือกทำเครื่องหมายว่าเสร็จแล้ว
    it('TC04 - Complete todo', () => {

        // เลือก Checkbox ของ Todo รายการแรก
        cy.get('.todo-list li')
            .first()
            .find('.toggle')
            .check();

        // ตรวจสอบว่ารายการแรกมี class completed
        cy.get('.todo-list li')
            .first()
            .should('have.class', 'completed');

    });

    // TC05: ตรวจสอบว่ารายการถูกทำเครื่องหมายเสร็จแล้ว
    it('TC05 - Check completed todo', () => {

        // เลือก Checkbox ของรายการแรก
        cy.get('.todo-list li')
            .first()
            .find('.toggle')
            .check();

        // ตรวจสอบว่า Checkbox ถูกเลือก
        cy.get('.todo-list li')
            .first()
            .find('.toggle')
            .should('be.checked');

    });

    // TC06: แสดงเฉพาะรายการที่ยังไม่เสร็จ
    it('TC06 - Filter active todos', () => {

        // ทำเครื่องหมายรายการแรกว่าเสร็จแล้ว
        cy.get('.todo-list li')
            .first()
            .find('.toggle')
            .check();

        // คลิกตัวกรอง Active
        cy.contains('Active').click();

        // ตรวจสอบว่าไม่มีรายการที่มี class completed
        cy.get('.todo-list li.completed')
            .should('not.exist');

    });

    // TC07: แสดงเฉพาะรายการที่เสร็จแล้ว
    it('TC07 - Filter completed todos', () => {

        // ทำเครื่องหมายรายการแรกว่าเสร็จแล้ว
        cy.get('.todo-list li')
            .first()
            .find('.toggle')
            .check();

        // คลิกตัวกรอง Completed
        cy.contains('Completed').click();

        // ตรวจสอบว่ารายการที่แสดงเป็นรายการ completed
        cy.get('.todo-list li')
            .should('have.length', 1)
            .and('have.class', 'completed');

    });

    // TC08: แสดงรายการทั้งหมด
    it('TC08 - Show all todos', () => {

        // คลิกตัวกรอง All
        cy.contains('All').click();

        // ตรวจสอบว่ารายการเริ่มต้นยังมี 2 รายการ
        cy.get('.todo-list li')
            .should('have.length', 2);

    });

    // TC09: ลบรายการ Todo
    it('TC09 - Delete todo', () => {

        // เพิ่มรายการใหม่เพื่อใช้ทดสอบการลบ
        cy.get('.new-todo').type('Delete this task{enter}');

        // เลือกรายการที่เพิ่งเพิ่ม
        cy.contains('.todo-list li', 'Delete this task')

            // แสดงปุ่มลบของรายการนั้น
            .find('.destroy')

            // คลิกปุ่มลบ
            .click({ force: true });

        // ตรวจสอบว่ารายการดังกล่าวหายไป
        cy.get('.todo-list')
            .should('not.contain.text', 'Delete this task');

    });

    // TC10: ลบรายการที่ทำเสร็จแล้วทั้งหมด
    it('TC10 - Clear completed todos', () => {

        // ทำเครื่องหมายรายการแรกว่าเสร็จแล้ว
        cy.get('.todo-list li')
            .first()
            .find('.toggle')
            .check();

        // คลิกปุ่ม Clear completed
        cy.contains('Clear completed').click();

        // ตรวจสอบว่าไม่มีรายการ completed เหลืออยู่
        cy.get('.todo-list li.completed')
            .should('not.exist');

    });

});

// เริ่มต้นชุดทดสอบ Cart และ Checkout
describe('Cart and Checkout Test', () => {

    // เปิดเว็บไซต์และ Login ก่อนทุก Test Case
    beforeEach(() => {

        // เปิดหน้า Login
        cy.visit('https://www.saucedemo.com/');

        // กรอก Username
        cy.get('#user-name').type('standard_user');

        // กรอก Password
        cy.get('#password').type('secret_sauce');

        // คลิก Login
        cy.get('#login-button').click();

        // ตรวจสอบว่าเข้าสู่หน้า Products สำเร็จ
        cy.url().should('include', '/inventory.html');

    });

    // TC01: เพิ่มสินค้าหนึ่งรายการลงตะกร้า
    it('TC01 - Add one product to cart', () => {

        // คลิกปุ่ม Add to cart ของสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // ตรวจสอบว่าป้ายตะกร้าแสดงเลข 1
        cy.get('.shopping_cart_badge')
            .should('have.text', '1');

    });

    // TC02: เพิ่มสินค้าสองรายการลงตะกร้า
    it('TC02 - Add two products to cart', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เพิ่มสินค้า Bike Light
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        // ตรวจสอบว่าตะกร้ามีสินค้า 2 รายการ
        cy.get('.shopping_cart_badge')
            .should('have.text', '2');

    });

    // TC03: ตรวจสอบชื่อสินค้าที่อยู่ในตะกร้า
    it('TC03 - Check product in cart', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้าสินค้า
        cy.get('.shopping_cart_link').click();

        // ตรวจสอบว่ามีชื่อ Backpack
        cy.get('.cart_item')
            .should('contain.text', 'Sauce Labs Backpack');

    });

    // TC04: ตรวจสอบราคาสินค้าในตะกร้า
    it('TC04 - Check product price', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // ตรวจสอบว่าราคาสินค้าเป็น $29.99
        cy.get('.inventory_item_price')
            .should('have.text', '$29.99');

    });

    // TC05: ลบสินค้าจากหน้าสินค้า
    it('TC05 - Remove product from inventory page', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // คลิกปุ่ม Remove ของสินค้า Backpack
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();

        // ตรวจสอบว่าป้ายจำนวนสินค้าในตะกร้าหายไป
        cy.get('.shopping_cart_badge')
            .should('not.exist');

    });

    // TC06: ลบสินค้าจากหน้าตะกร้า
    it('TC06 - Remove product from cart', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // คลิกปุ่ม Remove
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();

        // ตรวจสอบว่าไม่มีสินค้า Backpack อยู่ในตะกร้า
        cy.get('.cart_item')
            .should('not.exist');

    });

    // TC07: กลับไปเลือกสินค้าต่อ
    it('TC07 - Continue shopping', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // คลิก Continue Shopping
        cy.get('[data-test="continue-shopping"]').click();

        // ตรวจสอบว่ากลับมาหน้า Products
        cy.url().should('include', '/inventory.html');

    });

    // TC08: เริ่มต้น Checkout
    it('TC08 - Start checkout', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // คลิก Checkout
        cy.get('[data-test="checkout"]').click();

        // ตรวจสอบว่ามีช่องกรอก First Name
        cy.get('[data-test="firstName"]')
            .should('be.visible');

        // ตรวจสอบว่ามีช่องกรอก Last Name
        cy.get('[data-test="lastName"]')
            .should('be.visible');

        // ตรวจสอบว่ามีช่องกรอก Postal Code
        cy.get('[data-test="postalCode"]')
            .should('be.visible');

    });

    // TC09: กรอกข้อมูล Checkout สำเร็จ
    it('TC09 - Fill checkout information', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // เริ่ม Checkout
        cy.get('[data-test="checkout"]').click();

        // กรอกชื่อ
        cy.get('[data-test="firstName"]').type('Test');

        // กรอกนามสกุล
        cy.get('[data-test="lastName"]').type('User');

        // กรอกรหัสไปรษณีย์
        cy.get('[data-test="postalCode"]').type('10110');

        // คลิก Continue
        cy.get('[data-test="continue"]').click();

        // ตรวจสอบว่าไปยังหน้า Overview
        cy.url().should('include', '/checkout-step-two.html');

    });

    // TC10: Checkout โดยไม่กรอก First Name
    it('TC10 - Checkout without first name', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // เริ่ม Checkout
        cy.get('[data-test="checkout"]').click();

        // ไม่กรอก First Name
        // กรอก Last Name
        cy.get('[data-test="lastName"]').type('User');

        // กรอกรหัสไปรษณีย์
        cy.get('[data-test="postalCode"]').type('10110');

        // คลิก Continue
        cy.get('[data-test="continue"]').click();

        // ตรวจสอบข้อความแจ้งว่าต้องกรอก First Name
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', 'First Name is required');

    });

    // TC11: Checkout โดยไม่กรอก Last Name
    it('TC11 - Checkout without last name', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // เริ่ม Checkout
        cy.get('[data-test="checkout"]').click();

        // กรอก First Name
        cy.get('[data-test="firstName"]').type('Test');

        // ไม่กรอก Last Name

        // กรอกรหัสไปรษณีย์
        cy.get('[data-test="postalCode"]').type('10110');

        // คลิก Continue
        cy.get('[data-test="continue"]').click();

        // ตรวจสอบข้อความแจ้งว่าต้องกรอก Last Name
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain.text', 'Last Name is required');

    });

    // TC12: Checkout สำเร็จ
    it('TC12 - Complete checkout successfully', () => {

        // เพิ่มสินค้า Backpack
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // เปิดหน้าตะกร้า
        cy.get('.shopping_cart_link').click();

        // เริ่ม Checkout
        cy.get('[data-test="checkout"]').click();

        // กรอกชื่อ
        cy.get('[data-test="firstName"]').type('Test');

        // กรอกนามสกุล
        cy.get('[data-test="lastName"]').type('User');

        // กรอกรหัสไปรษณีย์
        cy.get('[data-test="postalCode"]').type('10110');

        // คลิก Continue เพื่อไปหน้า Overview
        cy.get('[data-test="continue"]').click();

        // ตรวจสอบว่าหน้า Overview แสดงอยู่
        cy.get('.title').should('have.text', 'Checkout: Overview');

        // คลิก Finish เพื่อยืนยันคำสั่งซื้อ
        cy.get('[data-test="finish"]').click();

        // ตรวจสอบข้อความยืนยันคำสั่งซื้อ
        cy.get('.complete-header')
            .should('have.text', 'Thank you for your order!');

        // ตรวจสอบว่ามีข้อความยืนยันการจัดส่ง
        cy.get('.complete-text')
            .should('be.visible');

    });

});

// ค้นหาด้วย ID
cy.get('#username');

// ค้นหาด้วย Class
cy.get('.login-button');

// ค้นหาด้วย Attribute
cy.get('[data-test="login-button"]');

// ค้นหาด้วยข้อความ
cy.contains('Login');

// ค้นหาด้วย Tag
cy.get('button');

// ค้นหาปุ่มที่มีข้อความ Login
cy.contains('button', 'Login');
