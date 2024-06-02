import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getEmployee() {
    return this.employeeService.getEmployee();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateEmployee(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
