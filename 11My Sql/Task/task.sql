use task;
create table CLIENTS_MASTER(
	ClientNo varchar(6),
    SName varchar(20),
    address1 varchar(30),
	address2 varchar(30),
    City varchar(15),
    Pincode int(8),
    State varchar(15),
    BalDue float(10.2),
    primary key(ClientNo)
);
insert into clients_master values('C00001','Ivan Bayross','Andheri','Borivali','Mumbai',400054,'Maharastra',15000),

('C00002','Mamta Muzumdar','Tiruvan','Kunchipusi','Madras',780001,'Tamil Nadu',null),
('C00003','Chhaya Bankar','Mumbai East','Andheri','Mumbai',400057,'Maharastra',5000),
('C00004','Ashwini Joshi','Dimond city','Sunstar','Bangalore',560001,'Karnataka',null),
('C00005','Hansel Colaco','Borivali','Andheri','Mumbai',400060,'Maharastra',2000),
('C00006','Deepak Sharma','Angle','Starpoint','Mangalore',560050,'Karnataka',null);

select *from clients_master;


create table PRODUCT_MASTER(
	ProductNo varchar(6) primary key,
    Description varchar(15)not null,
    Profit_Percent float(4.2)not null,
    Unit_Measure varchar(10)not null,
    QtyOnHand int(8)not null,
    RecordLvl int(8)not null,
    SellPrice float(8.2)not null,
    CostPrice float(8.2)not null,
    CHECK (ProductNo LIKE 'P%'),
    CHECK (SellPrice!=0),
    CHECK (CostPrice!=0)
);

insert into PRODUCT_MASTER values
('P00001','T-Shirts',5,'Piece',200,50,350,250),
('P0345','Shirts',6,'Piece',150,50,500,350),
('P06734','Cotton Jeans',5,'Piece',100,20,600,450),
('P07865','Jeans',5,'Piece',100,20,750,500),
('P07868','Trousers',2,'Piece',150,50,850,550),
('P07885','Pull Overs',2.5,'Piece',80,30,700,450),
('P07965','Denim Shirts',4,'Piece',100,40,350,250),
('P07975','Lycra Tops',5,'Piece',70,30,300,175),
('P08865','Skirts',5,'Piece',75,30,450,300);

select * from Product_master;


create table SALE_MASTER(
	SalesmanNo varchar(6)primary key,
    SName varchar(20)not null,
    Address1 varchar(30)not null,
	Address2 varchar(30),
	City varchar (20),
    PinCode int(8),
    State Varchar(20),
    SalAmt float(8.2)not null,
    TgtAmt float(6.2)not null,
    YtdSales float(6.2)not null,
    Remarks varchar(60),
    CHECK (SalesmanNo LIKE 'S%'),
    CHECK (SalAmt!=0),
    CHECK (TgtAmt!=0)
);


insert into SALE_MASTER values 
('S00001','Aman','A/14','Worli','Mumbai',400002,'Maharashtra',3000,100,50,'Good'),
('S00002','Omkar','65','Nariman','Mumbai',400001,'Maharashtra',3000,200,100,'Good'),
('S00003','Raj','P-7','Bandra','Mumbai',400032,'Maharashtra',3000,200,100,'Good'),
('S00004','Ashish','A/5','Juhu','Mumbai',400044,'Maharashtra',3500,200,150,'Good');

select *from SALE_MASTER; 



create table Sales_order(
	Orderno varchar(6)primary key,
    clientno varchar(6),
    orderDate date not null,
    DelyadDr varchar(25),
	salesmanno varchar(6),
    delytype char(1),
    billYN char(1),
    delayDate date,		
    orderstatus varchar(10),
    CHECK (orderno LIKE 'O%'),
    FOREIGN KEY(clientno)references CLIENTS_MASTER(ClientNo),
    FOREIGN KEY(salesmanno)references SALE_MASTER(SalesmanNo),
    constraint CHK_CUSTMSTR_DELYType CHECK(delytype IN ('P','F')),
    CHECK (orderDate<delayDate),
    CHECK (orderstatus IN ('In Process','Fulfilled','BackOrder','Cancelled'))
);

Insert into Sales_order values 
('O19001','C00001','02-07-20','','S00001','F','N','04-06-12','In Process'),
('O19002','C00002','02-07-27','','S00002','P','N','04-06-25','Cancelled'),
('O46865','C00003','02-02-20','','S00003','F','Y','04-02-18','Fulfilled'),
('O19003','C00001','02-04-07','','S00001','F','Y','04-04-03','Fulfilled'),
('O46866','C00004','02-05-22','','S00002','P','N','04-05-20','Cancelled'),
('O19008','C00005','02-05-26','','S00004','F','N','04-05-24','In Process');

select *from Sales_order; 

create table Sales_order_Detail(
    OrderNo varchar(6),
    ProductNo varchar(6),
    QtyOrdered int(8),
    QtyDisp int(8),
    ProductRate float(10.2),
    FOREIGN KEY (OrderNo) references Sales_order(Orderno),
    FOREIGN KEY (ProductNo) references PRODUCT_MASTER(ProductNo)
);

insert into Sales_order_Detail values
('O19001','P00001',4,4,525),
('O19001','P07965',2,1,8400),
('O19001','P07885',2,1,5250),
('O19002','P00001',10,0,525),
('O46865','P07868',3,3,3150),
('O46865','P07885',3,1,5250),
('O46865','P00001',10,10,525),
('O46865','P0345',4,4,1050),
('O19003','P0345',2,2,1050),
('O19003','P06734',1,1,12000),
('O46866','P07965',1,0,8400),
('O46866','P07975',1,0,1050),
('O19008','P00001',10,5,525),
('O19008','P07975',5,3,1050);

select *from Sales_order_Detail; 

-- Querys

use task;
select *from clients_master;
-- a)clients having 'a' as the second letter in their names
SELECT SName FROM clients_master WHERE SName LIKE '_a%';

-- b)clients who stay in city whose first letter is 'M'
SELECT SName,City FROM clients_master WHERE City LIKE 'M%';

-- c)clients who stay in 'Banglore' or 'Manglore'
select SName,City from clients_master where City = 'Bangalore' or City='Mangalore';

-- d)clients whose BalDue is greter than 10000
select SName,BalDue from clients_master where BalDue>=10000;

-- e)information from sales_order for order placed in the month of June
select *from Sales_order 
where month (orderDate)=06 Group BY MONTH(orderDate);

-- f)order informations of client 'C00001' and 'C00002' 
select *from Sales_order_Detail where OrderNo='O19001' or OrderNo='O19002';   
 
--  e)list products whose Selling price is >500 and <=750
select ProductNo,Description,SellPrice from PRODUCT_MASTER where SellPrice>500&&SellPrice<=750;
 
--  h)list products whose selling price is >500. Calculate new sell price as, original sellprice*.15 rename the column name(query) as new_price
select ProductNo,Description,SellPrice*.15+SellPrice as new_price from PRODUCT_MASTER where SellPrice>500;

-- i)list name,city,state of client who are not in 'Maharastra'
select SName,City,State from clients_master where State!='Maharastra';

-- j)total number of order
SELECT SUM(QtyOrdered) AS TotalItemsOrdered FROM Sales_order_Detail;

-- k)AVG Price of all Products
SELECT  AVG(CostPrice)  AS AveragePrice FROM PRODUCT_MASTER;


-- l)determine min,max price of Product rename them Min_Price and Max_Price
select max(SellPrice) AS 'Max_Price' from PRODUCT_MASTER;
select min(SellPrice) AS 'Min_Price' from PRODUCT_MASTER;

-- m)count products whose price is <500 
SELECT COUNT(CostPrice) AS 'ProductsPrice<500' FROM PRODUCT_MASTER where CostPrice<500;

-- n)products whose QtyOnHand is less than reorder level
select Description,QtyOnHand,RecordLvl from PRODUCT_MASTER where QtyOnHand<RecordLvl;


-- Sql join

-- inner join
select CLIENTS_MASTER.ClientNo
from CLIENTS_MASTER
inner join Sales_order
on CLIENTS_MASTER.ClientNo=Sales_order.clientno; 

-- short
select *from CLIENTS_MASTER
inner join Sales_order on CLIENTS_MASTER.ClientNo=Sales_order.clientno; 

use task;						
-- all table connected
select * from Sales_order 
inner join Sales_order_Detail  on Sales_order.orderno = Sales_order_Detail.orderno
inner join Product_master on Product_master.productno = Sales_order_Detail.productno
inner join clients_master on clients_master.clientno = Sales_order.clientno
where clients_master.clientno='C00001';

-- short
select * from Sales_order so
inner join Sales_order_Detail sod  on so.orderno = sod.orderno
inner join Product_master pm on  pm.productno = sod.productno
inner join clients_master cm on cm.clientno = so.clientno
where cm.clientno='C00001';



-- Join Query 

use task;
-- a)find products which have been sold to 'Ivan Bayross'
SELECT cm.SName ,pm.description as 'Products'
FROM CLIENTS_MASTER cm 
inner join Sales_order so on so.clientno=CM.clientno
inner join Sales_order_Detail sod on sod.ORDERNO=so.ORDERNO
INNER JOIN PRODUCT_MASTER PM ON PM.ProductNo=sod.ProductNo
where CM.clientno='C00001';   

					-- or

select sod.ProductNo,pm.Description 
from Sales_order_Detail sod,sales_order so,Product_master pm, clients_master cm
where pm.ProductNo = sod.ProductNo
and so.orderno = sod.orderno
and cm.ClientNo = so.clientno 
and cm.clientno = "C00001";

-- b)find product and quantity that will have to delivered in the current month
select * from Sales_order so 
inner join Sales_order_Detail sod on so.Orderno = sod.OrderNo
inner join PRODUCT_MASTER pm on sod.ProductNo = pm.ProductNo
where so.delayDate='2004-02-18';


-- c)list the product and description of constantly sold(rapidly moving)product 
SELECT distinct pm.ProductNo,pm.Description
from Sales_order_Detail sod,PRODUCT_MASTER pm
where pm.ProductNo = sod.ProductNo;

-- d)list the names of clients who purchased 'Trousers'
 SELECT cm.SName ,pm.description as 'Products'
FROM CLIENTS_MASTER cm 
inner join Sales_order so on so.clientno=CM.clientno
inner join Sales_order_Detail sod on sod.ORDERNO=so.ORDERNO
INNER JOIN PRODUCT_MASTER PM ON PM.ProductNo=sod.ProductNo
where  description='Trousers';


-- e)list the products and orders from customers who have a ordered less than 5 units of 'Pull Overs'
SELECT cm.SName,cm.ClientNo ,pm.description as 'Products',sod.QtyOrdered as 'Qty'
FROM CLIENTS_MASTER cm 
inner join Sales_order so on so.clientno=CM.clientno
inner join Sales_order_Detail sod on sod.ORDERNO=so.ORDERNO
INNER JOIN PRODUCT_MASTER PM ON PM.ProductNo=sod.ProductNo
where pm.Description='Pull Overs' and sod.QtyOrdered<5;

-- f)find out product and quantity order placed by 'Ivan Bayross' and 'Mamta Mujumdar'
SELECT cm.SName ,pm.description as 'Products',sod.QtyOrdered as 'Qty'
FROM CLIENTS_MASTER cm 
inner join Sales_order so on so.clientno=CM.clientno
inner join Sales_order_Detail sod on sod.ORDERNO=so.ORDERNO
INNER JOIN PRODUCT_MASTER PM ON PM.ProductNo=sod.ProductNo
where CM.SName='Ivan Bayross' and CM.Sname='Mamta Muzumdar';  

-- g)find out product and quantity order placed by ClientNo 'C00001' and 'C00002'
SELECT cm.ClientNo ,pm.description as 'Products',sod.QtyOrdered as 'Qty'
FROM CLIENTS_MASTER cm 
inner join Sales_order so on so.clientno=CM.clientno
inner join Sales_order_Detail sod on sod.ORDERNO=so.ORDERNO
INNER JOIN PRODUCT_MASTER PM ON PM.ProductNo=sod.ProductNo
where CM.ClientNo='C00001' and CM.ClientNo='C00002';

-- SUb Query

use task;
-- a)find the productno and description of non moving products i.e product not being sold
select ProductNo,Description from PRODUCT_MASTER as pm
where ProductNo in(
select ProductNo from Sales_order_Detail
where OrderNo in (
select Orderno from Sales_order
where pm.ProductNo is null));

-- b)list customername, Address1,Address2,City,Pincode for client who has placed order no 'O19001'.
select SName,Address1,Address2,City,PinCode from clients_master
where clientno in(
select clientno from sales_order
where orderno in (
select orderno from Sales_order_Detail
where Orderno='O19001'));

-- c)list client who placed order before the month of May '02 
select clientno,sname from clients_master
where clientno in(
select clientno from sales_order
where orderno in (
select orderno from Sales_order_Detail
where Sales_order.orderDate<'02-05-02'));

-- d)list the product 'Lycra Top' has been ordered by any client and print the clientno, name to whom it was sold  
select *from PRODUCT_MASTER
where ProductNo in(
select ProductNo from Sales_order_Detail
where OrderNo in (
select Orderno from Sales_order
where clientno in (
select ClientNo from CLIENTS_MASTER
where ProductNo='P07975')));

-- e)list clients who have placed order worth rs.10,000 or more
select clientno,sname from clients_master
where clientno in(
select clientno from sales_order
where orderno in (
select orderno from Sales_order_Detail
where QtyOrdered*ProductRate >=10000));	


-- Group By Query

-- a)print description and total Qty sold for each product

select so.clientno,sod.ProductNo,pm.Description,sum(QtyOrdered)
from Sales_order_Detail sod,sales_order so,Product_master pm, clients_master cm
where so.orderno = sod.orderno
and sod.orderno = pm.ProductNo
and so.clientno = cm.clientno
Group by so.clientno,sod.ProductNo,pm.Description
having so.ClientNo = 'C00001'and so.clientno = 'C00002';

