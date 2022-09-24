create database basic;
use basic;

CREATE TABLE GFG_salary(
emp_ID INT,
emp_name VARCHAR(50),
emp_course_mentor VARCHAR(30),
emp_An_salary INT
);

INSERT INTO GFG_salary VALUES
(1, 'EmpABC', 'C++', 480000),
(2, 'EmpDEF', 'JAVA', 540000),
(3, 'EmpXYZ', 'DSA', 600000);

select *from GFG_salary;
-- (4, 'EmpPQR', 'GO', '480000'),

select count(emp_name) as 'Total Employee' from GFG_salary;

select emp_name, emp_An_salary/12 AS 'Monthly Salery',emp_An_Salary AS 'Annual Salary' from GFG_salary;

SELECT emp_name, (emp_An_salary/12) AS 'Monthly Salary', emp_An_Salary AS 'Annual Salary' FROM GFG_salary ;

select emp_name,min(emp_An_salary) AS 'Min Salery' from GFG_salary;

select emp_name,max(emp_An_salary) AS 'Max Salery' from GFG_salary;

select emp_name,floor(emp_An_salary) AS 'Aproximate' from GFG_salary;

select emp_name,ceil(emp_An_salary) AS 'Aproximate' from GFG_salary;

SELECT  sum((emp_An_salary/12)) AS 'Total Monthly Salary', sum(emp_An_salary) AS 'Total Annual Salary' FROM GFG_salary ;


--extra
select floor(4.3) from dual;
select ceil(4.3) from dual;
select sqrt(4) from dual;
select pow(3,3) from dual;