import bcrypt from 'bcrypt';
const psqlAPM = require('./psqlAPM');

class UserModel {
  // Hash the user's password
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // Compare hashed password with the input password
  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Create a new user in the database
  async createUser(name: string, email: string, password: string, designation: string, empId: number) {
    const hashedPassword = await this.hashPassword(password);
    const queryText = `
      INSERT INTO "Users" (name, email, designation, empId, password, "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const queryParam = [name, email, designation, empId, hashedPassword, new Date(), new Date()];
    return await psqlAPM.fnDbQuery('createUser', queryText, queryParam);
  }

  // Find a user by email
  async findByemail(email: string) {
    const queryText = 'SELECT * FROM "Users" WHERE email = $1';
    const queryParam = [email];
    return await psqlAPM.fnDbQuery('findByemail', queryText, queryParam);
  }

  // Update the user's password
  async updatePassword(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const queryText = 'UPDATE "Users" SET password = $1 WHERE email = $2';
    const queryParam = [hashedPassword, email];
    return await psqlAPM.fnDbQuery('updatePassword', queryText, queryParam);
  }

  // Register a leave request
  // async registerForLeave(user_id: number, Startdate: Date, endDate: Date, leave_type: number, noOfDays: number) {
  //   const queryText = `
  //     INSERT INTO leave_request (user_id, start_date, end_date, leave_type_id, no_of_days) 
  //     VALUES ($1, $2, $3, $4, $5)
  //   `;
  //   const queryParam = [user_id, Startdate, endDate, leave_type, noOfDays];
  //   return await psqlAPM.fnDbQuery('registerForLeave', queryText, queryParam);
  // }

  // Check user's leave balance
  async checkforleave(user_id: number, leave_type_id: number) {
    const queryText = 'SELECT * FROM user_leave_details WHERE user_id = $1 AND leave_type_id = $2';
    const queryParam = [user_id, leave_type_id];
    return await psqlAPM.fnDbQuery('checkforleave', queryText, queryParam);
  }

  // Update user's leave balance
  async updateUserLeave(user_id: number, leave_type_id: number, no_of_days: number, newAvailable: number) {
    const queryText = `
      UPDATE user_leave_details 
      SET available = $1, used = $2, modified_by = $3, modified_on = $4 
      WHERE leave_type_id = $5 AND user_id = $6
    `;
    const queryParam = [newAvailable, no_of_days, user_id, new Date(), leave_type_id, user_id];
    return await psqlAPM.fnDbQuery('updateUserLeave', queryText, queryParam);
  }
async getUserleaveDetails(id:Number){
  const queryText=`Select * from user_leave_details where user_id=$1`;
  const queryParam=[id];
  return await psqlAPM.fnDbQuery('getUserleaveDetails',queryText,queryParam)

}
  // Submit a leave request
  async userleaveRequest(user_id:number, startdate: Date, endDate: Date, leave_type_id:Number,no_of_days:number,reason:String) {
    const queryText = `
      INSERT INTO leave_request (user_id, start_date, end_date,leave_type_id,no_of_days,reason,created_on,created_by) 
      VALUES ($1, $2, $3, $4, $5,$6,$7,$8)`;
    const queryParam = [user_id, startdate, endDate, leave_type_id, no_of_days,reason,new Date(),user_id];
    return await psqlAPM.fnDbQuery('userleaveRequest', queryText, queryParam);
  }

 
 

  // Get all leave types
  async getLeaveType() {
    const queryText = 'SELECT * FROM leave_type';
    return await psqlAPM.fnDbQuery('getLeaveType', queryText);
  }
 
  async getUserLeave(id:number){
    const queryText=`SELECT lt.leave_type,uld.* FROM leave_type As lt INNER JOIN user_leave_details As uld ON lt.id = uld.leave_type_id WHERE 
    uld.user_id=$1`;
    const queryParam=[id];
    return await psqlAPM.fnDbQuery('getUserLeave',queryText,queryParam);
  }
  async InsertResetPasswordToken(token:String,user_id:number){
  const queryText=`insert into reset_password_tokens(user_id,token) values($1,$2)`
  const queryParam=[user_id,token]
  return await psqlAPM.fnDbQuery('ResetPasswordToken',queryText,queryParam)
  }
  async UpdateResetPasswordToken(id:number,token:String){
    const queryText=`update reset_password_tokens set token=$1 where user_id=$2`;
    const queryParam=[token,id];
    return await psqlAPM.fnDbQuery('UpdateResetPasswordToken',queryText,queryParam)

  }
  async getResetPasswordToken(id:number)
  {
    const queryText=`select * from reset_password_tokens where user_id=$1`;
    const queryParam=[id];
    return await psqlAPM.fnDbQuery('getResetPasswordToken',queryText,queryParam)

  }
  async deleteResetPasswordToken(id:number){
    const queryText=`delete from reset_password_tokens where user_id=$1`;

    const queryParam=[id];
    console.log("queryText",queryText)
    console.log("queryparam",queryParam)
    return await psqlAPM.fnDbQuery('deleteResetPasswordToken',queryText,queryParam);
  }
}

export default new UserModel();
