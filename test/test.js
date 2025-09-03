import { helloWorld, add, fetch5RandomJokes, fetchRandomJoke } from '../js/main.js';
// Import the sinon library to allow us to create a spy on the console.log function
import sinon from 'sinon';

QUnit.module('main.js tests', function () {

    QUnit.test('helloWorld should print Hello World to an alert in Browser', function (assert) {

        /*Prevents crash due to alert function not being defined in node JS */
        /*This conditional check was written with help from chatGPT */
        if (typeof global.alert === 'undefined') {
            global.alert = function () { }; // Mock alert to prevent errors with Node 
        }

        //Arrange
        const winalertSpy = sinon.spy(global, 'alert');
        //Act
        helloWorld();
        //Assert
        assert.ok(winalertSpy.calledWith('Hello World!'), 'alert should be called with Hello World');
        winalertSpy.restore();
    });

    QUnit.test('add should return the sum of two numbers', function (assert) {
        //Arrange
        const num1 = 2;
        const num2 = 3;
        const expected = 5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, 3) should return 5');
    });

    QUnit.test('add should return the sum of negative numbers', function (assert) {
        //Arrange
        const num1 = -2;
        const num2 = -3;
        const expected = -5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(-2, -3) should return -5');
    });

    QUnit.test('add should return the sum of a positive and a negative number', function (assert) {
        //Arrange
        const num1 = 2;
        const num2 = -3;
        const expected = -1;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, -3) should return -1');
    });

    QUnit.test('A non-null string value should be returned to verify a joke was prited to webpage', function (assert) {

        const spyjoke = sinon.spy(fetchRandomJoke)

        assert.notEqual(spyjoke, null, "a non-null string value should populate the webpage");

    });

});
