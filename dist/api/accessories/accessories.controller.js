"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoriesController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles-decorator");
const role_auth_guard_1 = require("../auth/guards/role-auth.guard");
const roles_enum_1 = require("../users/enum/roles.enum");
const api_const_1 = require("../../common/constants/api-const");
const accessories_service_1 = require("./accessories.service");
const create_accessories_dto_1 = require("./dto/create-accessories.dto");
const update_accessories_dto_1 = require("./dto/update-accessories.dto");
const controllerName = `${api_const_1.apiVersion}/accessories/`;
let AccessoriesController = class AccessoriesController {
    constructor(accessoriesService) {
        this.accessoriesService = accessoriesService;
    }
    create(createAccessoryDto) {
        return this.accessoriesService.create(createAccessoryDto);
    }
    findAll() {
        return this.accessoriesService.findAll();
    }
    async findSortedItems(page, limit) {
        return await this.accessoriesService.findSortedItems(page, limit);
    }
    findOne(id) {
        return this.accessoriesService.findOne(id);
    }
    update(id, updateAccessoryDto) {
        return this.accessoriesService.update(id, updateAccessoryDto);
    }
    remove(id) {
        return this.accessoriesService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_accessories_dto_1.CreateAccessoryDto]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/filter?'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "findSortedItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_accessories_dto_1.UpdateAccessoryDto]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessoriesController.prototype, "remove", null);
AccessoriesController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [accessories_service_1.AccessoriesService])
], AccessoriesController);
exports.AccessoriesController = AccessoriesController;
//# sourceMappingURL=accessories.controller.js.map