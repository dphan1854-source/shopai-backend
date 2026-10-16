import { Controller, Get } from '@nestjs/common';

@Controller('api/health')
export class HealthController {
    @Get()
    check() {
        // Trả về nhanh, không đụng Database/Gemini — chỉ để xác nhận Server đang "thức"
        return { status: 'ok', timestamp: new Date().toISOString() };
    }
}