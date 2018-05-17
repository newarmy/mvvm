/**
单页面应用
*/
import SPA from  '../../src/SPA';
import child1 from './child1';
import child2 from'./child2';
import child3 from'./child3';
var table = {
    '/': child1,
    '/test': child2,
    '/login': child3
};
var spa = new SPA({
    table:table
});

