import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTabDto } from './dto';
import { TabService } from './tab.service';

@Controller('tab')
export class TabController {
  constructor(private readonly tabService: TabService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTabs() {
    return await this.tabService.getTabs();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTabById(@Param('id') id: string) {
    return await this.tabService.getTabById(id);
  }

  @Get('open')
  @HttpCode(HttpStatus.OK)
  async getOpenTabs() {
    return await this.tabService.getOpenTabs();
  }

  @Put('close/:id')
  @HttpCode(HttpStatus.OK)
  async closeTab(@Param('id') id: string) {
    return await this.tabService.closeTab(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTab(@Body() dto: CreateTabDto) {
    return await this.tabService.createTab(dto);
  }
}
