import { TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { icons } from '@otus/svg-icons';
import { waitFor } from '@otus/test-utils';

import { IconService } from './icon.service';

describe('IconService', () => {
  let service: IconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaIconLibrary],
    });
    service = TestBed.inject(IconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct icon definition', async () => {
    let iconDef;

    service.use('square');

    service.icons$.subscribe((iconDefinitions) => {
      iconDef = iconDefinitions['square']['fas'];
    });

    await waitFor(() => {
      expect(iconDef).toEqual(icons.fas.faSquare);
    });
  });
});
