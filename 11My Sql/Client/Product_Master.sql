use client;

create table PRODUCT_MASTER(
	ProductNo varchar(6),
    Description varchar(15),
    Profit_Percent float(4.2),
    Unit_Measure varchar(10),
    QtyOnHand int(8),
    RecordLvl int(8),
    SellPrice float(8.2),
    CostPrice float(8.2)
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

-- products available from Product Master
select Description
from product_master;

-- change CostPrice of Trousers to 950
SET SQL_SAFE_UPDATES = 0;
update client.product_master set CostPrice = 950 where ProductNo = 'P07868';


-- delete record whose Qty onhand is equal to Rs.100
DELETE FROM product_master WHERE QtyOnHand=100;