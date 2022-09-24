use client;
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

insert into clients_master values('C00001','Ivan Bayross','Andheri','Borivali','Mumbai',400054,'Maharastra',15000); 
-- Error Code: 1062. Duplicate entry 'C00001' for key 'clients_master.PRIMARY'

select *from clients_master;

drop table clients_master;

-- retrieving clients name 
select SName
from clients_master;

-- retrieving entire content
SELECT * FROM clients.clients_master;

-- retrieving name,city,state
select SName,City,State
from clients_master;

-- list of clients from Mumbai
select *from clients_master where City='Mumbai';

-- change city of Client(C00005) to Banglore
SET SQL_SAFE_UPDATES = 0;
update client.clients_master set city = 'Banglore' where ClientNo = 'C00005';

-- change BalDue of Client(C00001) to 1000
SET SQL_SAFE_UPDATES = 0;
update client.clients_master set Baldue = 1000 where ClientNo = 'C00001';

-- delete record whose Colomns state holds the value Tamilnadu
DELETE FROM clients_master WHERE State='Tamil Nadu';

-- deleting the table along with its data
drop table clients_master;


-- add colomn telephone 
ALTER TABLE clients_master
ADD COLUMN PhoneNo varchar(10);

SET SQL_SAFE_UPDATES = 0;
update client.clients_master set PhoneNo  = '8866724478' where ClientNo = 'C00001';
update client.clients_master set PhoneNo  = '9033553282' where ClientNo = 'C00002';
update client.clients_master set PhoneNo  = '8134907865' where ClientNo = 'C00003';
update client.clients_master set PhoneNo  = '7878654578' where ClientNo = 'C00004';
update client.clients_master set PhoneNo  = '8989765467' where ClientNo = 'C00005';
update client.clients_master set PhoneNo  = '7397189573' where ClientNo = 'C00006';
