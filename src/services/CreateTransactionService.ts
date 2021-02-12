import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('The type is invalid!');
    }

    if (type == 'outcome' && value > total) {
      throw new Error('You do not have enogugh balance!');
    }

    const transaction = this.transactionsRepository;

      return transaction.create({
        title,
        value,
        type
      });
  }
}

export default CreateTransactionService;
