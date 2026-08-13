import test from 'node:test';import assert from 'node:assert/strict';import {parseReceiptItems} from '../receipt-core.js';
test('parses quantity x unit price and total',()=>assert.deepEqual(parseReceiptItems('МОЛОКО 2 x 89,90 = 179,80'),[{name:'МОЛОКО',qty:2,price:89.9,cat:'Другое'}]));
test('parses item and price while ignores totals',()=>assert.deepEqual(parseReceiptItems('Хлеб 59,90 руб.\nИТОГО 249,80\nСдача 0'),[{name:'Хлеб',qty:1,price:59.9,cat:'Другое'}]));
test('parses semicolon review format',()=>assert.deepEqual(parseReceiptItems('Яблоки; 1,5; 120,00; Фрукты'),[{name:'Яблоки',qty:1.5,price:120,cat:'Фрукты'}]));
