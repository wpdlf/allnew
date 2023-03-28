--------------------------------------------------------
--  ������ ������ - ȭ����-3��-28-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table MEMBERTBL
--------------------------------------------------------

  CREATE TABLE "HR"."MEMBERTBL" 
   (	"MEMBERID" CHAR(8 BYTE), 
	"MEMBERNAME" NCHAR(5), 
	"MEMBERADDRESS" NCHAR(20)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into HR.MEMBERTBL
SET DEFINE OFF;
Insert into HR.MEMBERTBL (MEMBERID,MEMBERNAME,MEMBERADDRESS) values ('Dang    ','������  ','��� ��õ�� �ߵ�           ');
Insert into HR.MEMBERTBL (MEMBERID,MEMBERNAME,MEMBERADDRESS) values ('Jee     ','������  ','���� ���� �߻굿          ');
Insert into HR.MEMBERTBL (MEMBERID,MEMBERNAME,MEMBERADDRESS) values ('Han     ','���ֿ�  ','��õ ���� �־ȵ�           ');
Insert into HR.MEMBERTBL (MEMBERID,MEMBERNAME,MEMBERADDRESS) values ('Sang    ','�����  ','��� ������ �д籸          ');
--------------------------------------------------------
--  DDL for Index MEMBERTBL_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "HR"."MEMBERTBL_PK" ON "HR"."MEMBERTBL" ("MEMBERID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Trigger TRG_DELETEDMEMBERTBL
--------------------------------------------------------

  CREATE OR REPLACE TRIGGER "HR"."TRG_DELETEDMEMBERTBL" 
    after delete
    on membertbl
    for each row
begin
    insert into deletedmembertbl
    values (:old.memberid, :old.membername, :old.memberaddress, SYSDATE());
end;
/
ALTER TRIGGER "HR"."TRG_DELETEDMEMBERTBL" ENABLE;
--------------------------------------------------------
--  Constraints for Table MEMBERTBL
--------------------------------------------------------

  ALTER TABLE "HR"."MEMBERTBL" ADD CONSTRAINT "MEMBERTBL_PK" PRIMARY KEY ("MEMBERID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "HR"."MEMBERTBL" MODIFY ("MEMBERNAME" NOT NULL ENABLE);
  ALTER TABLE "HR"."MEMBERTBL" MODIFY ("MEMBERID" NOT NULL ENABLE);
