import test from 'node:test';import assert from 'node:assert/strict';import {parseReceiptItems} from '../receipt-core.js';
test('parses quantity x unit price and total',()=>assert.deepEqual(parseReceiptItems('МОЛОКО 2 x 89,90 = 179,80'),[{name:'МОЛОКО',qty:2,price:89.9,cat:'Другое'}]));
test('parses item and price while ignores totals',()=>assert.deepEqual(parseReceiptItems('Хлеб 59,90 руб.\nИТОГО 249,80\nСдача 0'),[{name:'Хлеб',qty:1,price:59.9,cat:'Другое'}]));
test('rejects noisy OCR service lines',()=>assert.deepEqual(parseReceiptItems('№ док.; 1; 90774; Другое\nAUTO К ОПЛАТЕ; 1; 9.12; Другое\n° 4 ¢ | » bpec | у I ||| IR A; 1; 8; Другое\nТовар; 1; 25,50; Продукты'),[{name:'Товар',qty:1,price:25.5,cat:'Продукты'}]));
